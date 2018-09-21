#!/bin/bash
set -o errexit
set -o pipefail
arguments="$@"
pushd game_tester
./build.sh $arguments
popd
pushd game_page_tester
./build.sh $arguments
popd
pushd landing_page_tester
./build.sh $arguments
popd
pushd loading_page_tester
./build.sh $arguments
popd
pushd scratch
./build.sh $arguments
popd
pushd standings_page_tester
./build.sh $arguments
popd
