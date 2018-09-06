#!/bin/bash
if [ "$(uname -s)" = "Darwin" ]; then
  STAT='stat -x -t "%Y%m%d%H%M%S"'
else
  STAT='stat'
fi
SUDOKU_PATH=../../library
if [ $# -eq 0 ] || [ "$1" != "Debug" ]; then
  export PROD_ENV=1
fi
if [ ! -d "node_modules" ]; then
  UPDATE_NODE=1
else
  pushd node_modules
  if [ ! -f "mod_time.txt" ]; then
    UPDATE_NODE=1
  else
    pt="$($STAT ../package.json | grep Modify | awk '{print $2 $3}')"
    mt="$($STAT mod_time.txt | grep Modify | awk '{print $2 $3}')"
    if [ "$pt" \> "$mt" ]; then
      UPDATE_NODE=1
    fi
    if [ "$UPDATE_NODE" = "" ]; then
      if [ ! -d "../$SUDOKU_PATH/library" ]; then
        UPDATE_NODE=1
      else
        pt="$(find ../$SUDOKU_PATH/source -type f | xargs $STAT | grep Modify | awk '{print $2 $3}' | sort -r | head -1)"
        mt="$($STAT mod_time.txt | grep Modify | awk '{print $2 $3}')"
        if [ "$pt" \> "$mt" ]; then
          UPDATE_NODE=1
        fi
      fi
    fi
  fi
  popd
fi
if [ "$UPDATE_NODE" = "1" ]; then
  UPDATE_BUILD=1
  pushd $SUDOKU_PATH
  ./build.sh
  popd
  npm install
  pushd node_modules
  cp -r ../$SUDOKU_PATH/library/* .
  if [ -d @types/sudoku ]; then
    rm -rf @types/sudoku
  fi
  mkdir -p @types/sudoku
  cp -r ../$SUDOKU_PATH/library/sudoku/* @types/sudoku
  echo "timestamp" > mod_time.txt
  popd
fi
if [ ! -d "application" ]; then
  UPDATE_BUILD=1
else
  st="$(find source/ -type f | xargs $STAT | grep Modify | awk '{print $2 $3}' | sort -r | head -1)"
  lt="$(find application/ -type f | xargs $STAT | grep Modify | awk '{print $2 $3}' | sort -r | head -1)"
  if [ "$st" \> "$lt" ]; then
    UPDATE_BUILD=1
  fi
fi
if [ "$UPDATE_BUILD" = "1" ]; then
  if [ -d application ]; then
    rm -rf application
  fi
  node ./node_modules/webpack/bin/webpack.js
  cp -r ../../resources application
  cp -r source/index.html application
fi
