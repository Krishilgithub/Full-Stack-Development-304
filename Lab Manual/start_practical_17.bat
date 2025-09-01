@echo off
echo Starting Practical 17 - Admin Panel (requires MongoDB)...
echo.
echo Make sure MongoDB is running before starting this application!
echo.
pause
cd /d "%~dp0Practical_17"
if exist "package.json" (
    echo Installing dependencies if needed...
    call npm install
    echo Starting Express server...
    call npm start
) else (
    echo Error: package.json not found in Practical_17 folder
    pause
)
