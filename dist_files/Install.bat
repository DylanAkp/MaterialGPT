@echo off
setlocal

set "source=%~dp0MaterialGPT-win32-x64"
set "destination=%LOCALAPPDATA%\MaterialGPT-win32-x64"
move "%source%" "%destination%"

set "programsShortcut=%APPDATA%\Microsoft\Windows\Start Menu\Programs\MaterialGPT.lnk"
call :createShortcut "%destination%\MaterialGPT.exe" "%programsShortcut%"

echo The installation is complete.
pause
goto :eof

:createShortcut
set "scriptPath=%~dp0"
set "vbsScript=%scriptPath%createShortcut.vbs"
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%vbsScript%"
echo sLinkFile = "%~2" >> "%vbsScript%"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%vbsScript%"
echo oLink.TargetPath = "%~1" >> "%vbsScript%"
echo oLink.Save >> "%vbsScript%"
cscript /nologo "%vbsScript%"
del "%vbsScript%"
goto :eof
