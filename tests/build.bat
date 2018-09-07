ECHO OFF
SETLOCAL
CALL %~dp0landing_page_tester/build.bat %*
CALL %~dp0scratch/build.bat %*
CALL %~dp0standings_page_tester/build.bat %*
ENDLOCAL
