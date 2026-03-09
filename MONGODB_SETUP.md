# MongoDB Setup Guide for JobBloom

## Quick Start

Your backend is already configured to work with MongoDB! Here's how to set it up:

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

MongoDB Atlas is the easiest and most popular way to use MongoDB without installing anything locally.

### Steps:

1. **Create a MongoDB Atlas Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Start Free"
   - Sign up with your email

2. **Create a Cluster:**
   - Click "Create" to deploy a new cluster
   - Select the Free tier
   - Choose a region closest to you
   - Click "Create Cluster" (this takes a few minutes)

3. **Create a Database User:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Set a username and password (save this!)
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (or your current IP)
   - Click "Confirm"

5. **Get your Connection String:**
   - Go back to "Clusters"
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string

6. **Update your .env file:**
   - Open `server/.env`
   - Replace MONGO_URI with your connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/jobbloom?retryWrites=true&w=majority
   ```

---

## Option 2: Local MongoDB Installation

If you prefer to run MongoDB locally:

### Windows:
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Install the MSI installer
3. During installation, add MongoDB to PATH
4. MongoDB will run as a Windows Service automatically

### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

## Verify Connection

Once you've configured your `.env` file:

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies (if not done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. You should see:
   ```
   MongoDB Connected: [cluster-name]
   Server running on port 5000
   ```

---

## API Endpoints Ready to Test

Once MongoDB is connected and the server is running:

- **Register:** POST http://localhost:5000/api/auth/register
- **Login:** POST http://localhost:5000/api/auth/login

Your React app on port 5173 will now be able to communicate with the backend!

---

## Troubleshooting

**"Cannot connect to MongoDB"**
- Make sure your MONGO_URI in `.env` is correct
- If using Atlas, verify your IP is whitelisted
- Check that your database user credentials are correct
- Wait a few minutes if you just created the cluster

**"Port 5000 is already in use"**
- Change PORT in `.env` to another port (e.g., 5001)

**"Cannot find module..."**
- Run `npm install` in the server folder

---

For more help, visit: https://docs.mongodb.com/
