@echo off
setlocal

set "programsShortcut=%APPDATA%\Microsoft\Windows\Start Menu\Programs\MaterialGPT.lnk"
if exist "%programsShortcut%" (
    del "%programsShortcut%"
)

set "destination=%LOCALAPPDATA%\MaterialGPT-win32-x64"
if exist "%destination%" (
    rmdir /s /q "%destination%"
)

echo The uninstallation is complete.
pause
