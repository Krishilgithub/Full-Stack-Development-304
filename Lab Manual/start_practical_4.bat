@echo off
echo Starting Practical 4 - React Application with Vite...
cd /d "%~dp0Practical_4"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting development server...
    call npm run dev
) else (
    echo Error: package.json not found in Practical_4 folder
    pause
)
