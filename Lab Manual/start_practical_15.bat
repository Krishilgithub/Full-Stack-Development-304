@echo off
echo Starting Practical 15 - Library Portal...
cd /d "%~dp0Practical_15"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_15 folder
    pause
)
