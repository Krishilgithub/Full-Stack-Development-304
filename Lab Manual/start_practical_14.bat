@echo off
echo Starting Practical 14 - Express.js File Operations...
cd /d "%~dp0Practical_14"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_14 folder
    pause
)
