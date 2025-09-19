# MongoDB Setup Guide for Windows

## 🎯 Complete Installation Steps

### Option 1: Download & Install MongoDB Community Server

1. **Download MongoDB**:

   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows x64, Version 6.0+, Package: MSI
   - Click "Download"

2. **Install MongoDB**:

   - Run the downloaded `.msi` file as Administrator
   - Select "Complete" setup type
   - **Important**: Check "Install MongoDB as a Service"
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\6.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\6.0\log`

3. **Install MongoDB Shell (mongosh)**:
   - Download from: https://www.mongodb.com/try/download/shell
   - Install the `.msi` file

### Option 2: Using MongoDB Atlas (Cloud Database)

If local installation is difficult, use MongoDB Atlas (free cloud database):

1. **Create Atlas Account**:

   - Go to: https://www.mongodb.com/atlas
   - Sign up for free account

2. **Create Cluster**:

   - Choose "Free Shared" cluster
   - Select region closest to you
   - Create cluster (takes 3-5 minutes)

3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

## ⚡ Testing MongoDB Connection

### For Local MongoDB:

```bash
# Check if MongoDB service is running
Get-Service -Name MongoDB*

# If not running, start it
net start MongoDB

# Test connection
mongosh "mongodb://localhost:27017"
```

### For MongoDB Atlas:

Update your `server.js` connection string:

```javascript
mongoose.connect(
	"mongodb+srv://username:password@cluster.mongodb.net/tuition_db",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
```

## 🔧 Troubleshooting

### Common Issues:

1. **Service not found**: MongoDB not installed as service

   - Solution: Reinstall MongoDB with service option checked

2. **Connection refused**: MongoDB service not running

   - Solution: `net start MongoDB` or restart MongoDB service

3. **Path not found**: MongoDB not in PATH

   - Solution: Add `C:\Program Files\MongoDB\Server\6.0\bin` to system PATH

4. **Permission issues**: Run as Administrator
   - Solution: Right-click command prompt → "Run as Administrator"

### Manual MongoDB Start:

If service installation fails, start MongoDB manually:

```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB server manually
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath "C:\data\db"
```

## ✅ Verification Steps

1. **Check MongoDB is running**:

   ```bash
   netstat -an | findstr 27017
   ```

   Should show: `TCP 127.0.0.1:27017`

2. **Test with mongosh**:

   ```bash
   mongosh "mongodb://localhost:27017"
   ```

3. **Test Node.js connection**:
   - Your Practical_17 server should start without connection errors
   - Check console for "Connected to MongoDB successfully!"

## 📱 Alternative: Use MongoDB Compass

Install MongoDB Compass (GUI tool) to manage your database:

- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- View/manage your `tuition_db` database

## 🚀 Ready to Test!

Once MongoDB is running, restart your Practical_17 server:

```bash
cd "Lab Manual\Practical_17"
node server.js
```

Your admin panel will now use persistent MongoDB storage!
