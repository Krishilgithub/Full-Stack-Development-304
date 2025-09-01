@echo off
echo Starting Practical 6 - React Application with Styling...
cd /d "%~dp0Practical_6"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting development server...
    call npm run dev
) else (
    echo Error: package.json not found in Practical_6 folder
    pause
)
