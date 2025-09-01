@echo off
echo Starting Practical 11 - Dashboard...
cd /d "%~dp0Practical_11"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_11 folder
    pause
)
