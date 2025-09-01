@echo off
echo Starting Practical 13 - Tax Form...
cd /d "%~dp0Practical_13"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_13 folder
    pause
)
