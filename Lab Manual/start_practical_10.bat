@echo off
echo Starting Practical 10 - Log Viewer...
cd /d "%~dp0Practical_10"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_10 folder
    pause
)
