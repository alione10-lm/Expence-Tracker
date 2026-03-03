# 💰 FinTech Personal Finance API

Backend API built with **Node.js**, **Express**, and **MongoDB**  
to manage personal financial transactions.

---

## 🚀 Features

- Add income & expense transactions
- Automatic balance calculation
- Prevent expense if balance is insufficient
- Pagination & filters
- Monthly statistics
- Validation using express-validator

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/alione10-lm/Expence-Tracker.git
```

### 2️⃣ Navigate into the project

```bash
cd Expence-Tracker
```

### 3️⃣ Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Setup

### Copy the example file

```bash
copy .env.example .env
```

### Update your `.env` file

```env
MONGO_URI=mongodb://127.0.0.1:27017/Expence-Tracker
PORT=5000

```

Make sure MongoDB is running locally  
OR use your MongoDB Atlas connection string.

---

## ▶️ Run the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

If everything works correctly, you should see:

```
MongoDB Connected
Server running on port 5000
```

---

## 🌐 API Base URL

```
http://localhost:5000
```

---

## 📌 Important Notes

- All responses are returned in JSON format
- Balance is calculated dynamically (not stored in database)
- Make sure MongoDB is running before starting the server

---
