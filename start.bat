@echo off
setlocal enabledelayedexpansion

REM ╔══════════════════════════════════════════════╗
REM ║      WebDisplays Video Player Starter       ║
REM ╚══════════════════════════════════════════════╝

REM === Auto-locate current folder ===
set "base_dir=%~dp0"
cd /d "%base_dir%"

REM === Read config.txt (if present) ===
set "port=3000"
if exist "config.txt" (
    for /f "usebackq tokens=1,2 delims==" %%A in ("config.txt") do (
        if /I "%%A"=="port" set "port=%%B"
    )
)

REM === Check for Node.js ===
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo Node.js is NOT installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

REM === Auto-install modules if not present ===
if not exist "%base_dir%node_modules" (
    echo.
    echo Installing required modules...
    call npm install
)

REM === Detect Hamachi IPv4 ===
set "hamachi=Not Found"
set "foundHamachi="
for /f "tokens=*" %%L in ('ipconfig 2^>nul') do (
    echo %%L | findstr /I "Hamachi" >nul && set "foundHamachi=1"
    if defined foundHamachi (
        echo %%L | findstr /C:"IPv4 Address" >nul && (
            for /f "tokens=2 delims=:" %%A in ("%%L") do (
                set "hamachi=%%A"
                set "hamachi=!hamachi: =!"
                set "foundHamachi="
            )
        )
    )
)

REM === Determine which IP to show ===
if not "!hamachi!"=="Not Found" (
    set "displayType=Hamachi"
    set "displayIP=!hamachi!"
) else (
    REM Fetch Local IP
    set "localip=Not Found"
    for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr /c:"IPv4 Address" 2^>nul') do (
        set "localip=%%f"
        goto :gotLocal
    )
    :gotLocal
    set "localip=!localip: =!"
    set "displayType=Local"
    set "displayIP=!localip!"
)

REM === Fetch Public IP ===
set "publicip=Unavailable"
for /f "tokens=* delims=" %%i in ('powershell -Command "(Invoke-RestMethod -Uri 'https://api.ipify.org')" 2^>nul') do set publicip=%%i

REM === Output simplified message ===
echo.
echo    %displayType% IP    : http://%displayIP%:%port%
echo    Public IP    : http://%publicip%:%port%
echo.

REM === Start the server ===
echo Starting server on port %port%...
node server.js
pause
exit /b
