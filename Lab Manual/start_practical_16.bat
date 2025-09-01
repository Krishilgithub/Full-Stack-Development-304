@echo off
echo Starting Practical 16 - Express.js Application...
cd /d "%~dp0Practical_16"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_16 folder
    pause
)
