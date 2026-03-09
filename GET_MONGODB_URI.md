# Getting Your MongoDB Atlas Connection String

## Step-by-Step Guide:

### 1. Go to MongoDB Atlas
- Visit: https://www.mongodb.com/cloud/atlas
- Login to your account (or create one)

### 2. Click "Connect" on Your Cluster
- Look for your cluster in the dashboard
- Click the "Connect" button

### 3. Copy Connection String
- Choose "Drivers" option
- Select "Node.js" as driver
- Copy the connection string that looks like:
  ```
  mongodb+srv://username:password@cluster-name.mongodb.net/jobbloom?retryWrites=true&w=majority
  ```

### 4. You'll see placeholders to replace:
- `username` - Your database user (the one you created)
- `password` - That user's password
- `cluster-name` - Your actual cluster name (e.g., cluster0, jobcluster, etc.)

### Example:
If your cluster name is "jobbloom" and you have a user "admin" with password "pass123":

```
mongodb+srv://admin:pass123@jobbloom.mongodb.net/jobbloom?retryWrites=true&w=majority
```

---

## What to do now:

1. **Get your full connection string from MongoDB Atlas** (follow steps above)
2. **Paste it below in the reply** (hide your password if concerned)
3. **Or directly update your .env file:**

Edit: `server/.env` and replace the MONGO_URI line with your actual connection string.
