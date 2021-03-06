ECHO OFF
SETLOCAL
SET UPDATE_NODE=
SET UPDATE_BUILD=
SET PROD_ENV=
PUSHD %~dp0
IF NOT "%1" == "Debug" (
  SET PROD_ENV=1
)
IF NOT EXIST node_modules (
  SET UPDATE_NODE=1
) ELSE (
  PUSHD node_modules
  IF NOT EXIST mod_time.txt (
    SET UPDATE_NODE=1
  ) ELSE (
    FOR /F %%i IN (
      'ls -l --time-style=full-iso ..\package.json ^| awk "{print $6 $7}"') DO (
      FOR /F %%j IN (
        'ls -l --time-style=full-iso mod_time.txt ^| awk "{print $6 $7}"') DO (
        IF "%%i" GEQ "%%j" (
          SET UPDATE_NODE=1
        )
      )
    )
  )
  POPD
)
IF "%UPDATE_NODE%" == "1" (
  SET UPDATE_BUILD=1
  CALL npm install
  PUSHD node_modules
  echo "timestamp" > mod_time.txt
  POPD
)
IF NOT EXIST library (
  SET UPDATE_BUILD=1
) ELSE (
  FOR /F %%i IN (
    'dir source /s/b/a-d ^| tr "\\" "/" ^| xargs ls -l --time-style=full-iso ^| awk "{print $6 $7}" ^| sort /R ^| head -1') DO (
    FOR /F %%j IN (
      'dir library /s/b/a-d ^| tr "\\" "/" ^| xargs ls -l --time-style=full-iso ^| awk "{print $6 $7}" ^| sort /R ^| head -1') DO (
      IF "%%i" GEQ "%%j" (
        SET UPDATE_BUILD=1
      )
    )
  )
)
IF "%UPDATE_BUILD%" == "1" (
  IF EXIST library (
    rm -rf library
  )
  node .\node_modules\webpack\bin\webpack.js
)
POPD
ENDLOCAL
