# 🚀 Full Stack Development Lab Manual - Port Assignments

## Port Configuration Summary

| Practical    | Project Name                 | Port | URL                   |
| ------------ | ---------------------------- | ---- | --------------------- |
| Practical_9  | Express.js Application       | 3006 | http://localhost:3006 |
| Practical_10 | Log Viewer                   | 3004 | http://localhost:3004 |
| Practical_11 | Basic Express App            | 3000 | http://localhost:3000 |
| Practical_12 | Interactive Calculator       | 3001 | http://localhost:3001 |
| Practical_13 | Tax Form with EJS            | 3005 | http://localhost:3005 |
| Practical_15 | Library Portal (Sessions)    | 3002 | http://localhost:3002 |
| Practical_16 | Portfolio Contact Form       | 3008 | http://localhost:3008 |
| Practical_17 | Admin Panel (MongoDB/Hybrid) | 3003 | http://localhost:3003 |
| Practical_18 | Notes API (RESTful Mobile)   | 3007 | http://localhost:3007 |

## ✅ Fixed Port Conflicts

### Previous Conflicts:

- ❌ Practical_9 and Practical_11 both used port 3000
- ❌ Practical_13 and Practical_15 both used port 3002

### Resolution:

- ✅ Practical_9: Changed from 3000 → 3006
- ✅ Practical_13: Changed from 3002 → 3005
- ✅ All practicals now have unique ports

## 🚨 Important Notes

1. **No Port Conflicts**: Each practical now runs on a unique port
2. **MongoDB Status**: Practical_17 shows database connection status (MongoDB/In-Memory)
3. **Atlas Connection**: Practical_17 can connect to MongoDB Atlas cloud database
4. **Session Management**: Practical_15 uses express-session for user management

## 🔧 Starting Multiple Practicals

You can now run multiple practicals simultaneously without conflicts:

```bash
# Terminal 1
cd "Practical_15"
npm start  # Runs on port 3002

# Terminal 2
cd "Practical_17"
npm start  # Runs on port 3003

# Terminal 3
cd "Practical_12"
npm start  # Runs on port 3001
```

## 🌐 Access URLs

- **Library Portal**: http://localhost:3002
- **Admin Panel**: http://localhost:3003 (with database status)
- **Calculator**: http://localhost:3001
- **Tax Form**: http://localhost:3005
- **Log Viewer**: http://localhost:3004

## 💡 Troubleshooting

If you still get `EADDRINUSE` errors:

1. Check which process is using the port: `netstat -ano | findstr :3002`
2. Kill the process: `taskkill /PID <process_id> /F`
3. Or restart the server with a different port

## 🎯 MongoDB Connection Status

Practical_17 (Admin Panel) shows:

- 🟢 **Green**: Connected to MongoDB (Atlas or Local)
- 🟡 **Yellow**: Using in-memory storage (fallback mode)

Current connection: **MongoDB Atlas** (ajyadodiya2003_db_user@cluster0.9buuyst.mongodb.net)
