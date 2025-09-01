@echo off
echo Starting Practical 3 - React App with Tailwind CSS...
cd /d "%~dp0Practical_3"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting development server...
    call npm run dev
) else (
    echo Error: package.json not found in Practical_3 folder
    pause
)
