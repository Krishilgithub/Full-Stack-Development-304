@echo off
echo Starting Practical 12 - Kids Calculator...
cd /d "%~dp0Practical_12"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_12 folder
    pause
)
