@echo off
echo Starting Practical 7 - React Application...
cd /d "%~dp0Practical_7"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting development server...
    call npm run dev
) else (
    echo Error: package.json not found in Practical_7 folder
    pause
)
