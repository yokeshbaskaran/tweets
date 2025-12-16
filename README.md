# 🩵 Tweets – Share Your Thoughts

A full-stack social media–style web application where users can share thoughts as tweets, interact with posts, and engage in real-time conversations. Built with **React + Node.js**, secured using **JWT authentication**, and deployed with a modern CI/CD workflow.

<!-- This project demonstrates **frontend UI design, backend API development, authentication, database integration, and deployment best practices**. -->

## 🚀 Features

🐤 Create, read, update, and delete tweets (CRUD)
🔐 Secure JWT-based authentication (Login / Signup)
❤️ Like and interact with tweets
📱 Fully responsive design (mobile + desktop)
⚡ Fast UI with React Query caching
🔔 Toast notifications & proper error handling
🎨 Twitter-inspired UI design

## 🎨 Project Description

This project highlights **end-to-end application development**, from UI to database.

- Users can sign up and log in securely
- Authenticated users can create and manage tweets
- Tweets can be liked and shared
- Backend APIs handle authentication, authorization, and data persistence
- Frontend consumes REST APIs with optimized state management

## 🎯 Live Demo

```bash
🔗 **Project Live Demo:** [https://tweets-of-messages.onrender.com](https://tweets-of-messages.onrender.com)
```

## 🖼️ Preview

![Image](https://github.com/user-attachments/assets/bcd150a6-8cb0-4151-9538-356991c716c2)

## 🛠 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router DOM
- React Query
- Axios
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image handling)

### DevOps & Deployment

- Hosting: Render
- CI/CD: GitHub Actions
- Environment Variables for secure configuration

## 🚀 Deployment Flow

1. Code pushed to GitHub repository
2. GitHub Actions triggers CI pipeline
3. Frontend & backend builds are validated
4. Application is deployed to **Render**
5. Live app served securely over HTTPS

## 🚀 Installation & Setup (Local)

### Clone the repository

```bash
git clone https://github.com/yokeshbaskaran/tweets.git
cd tweets
```

### Backend Environment Variables

```env
PORT=
MONGO_DB_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_SECRET=
CLOUDINARY_SECRET_APIKEY=
```

### Frontend Environment Variables

```env
VITE_SERVER_APP_URL=
```

### Install Dependencies

#### Frontend

```bash
npm install react-router-dom
npm install tailwindcss
npm install axios
npm install @tanstack/react-query
npm install react-hot-toast
npm install react-icons
```

#### Backend

```bash
npm install express
npm install mongoose
npm install dotenv
npm install cors
npm install bcryptjs
npm install cookie-parser
npm install cloudinary
npm install -D nodemon
```
