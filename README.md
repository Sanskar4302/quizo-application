## Quizo - Quiz Management System

Quizo is a web-based Quiz Management System that allows teachers to create, manage, and evaluate quizzes efficiently. Built with a modern tech stack, it provides a seamless and responsive experience.

## 🚀 Features
- Create, edit, and delete quizzes
- Real-time quiz management
- User authentication (Teacher Login)
- Responsive and modern UI with dark theme support
- Secure backend with authentication

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** TypeScript, Node.js, Express
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

## 📌 Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/quizo.git
cd quizo
```
### 2. Install Dependencies
#### Frontend
```sh
cd frontend
npm install
```
#### Backend
```sh
cd backend
npm install
```
### 3. Configure the Environment
Create a `.env` file in the backend directory and add the following:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Amapsgupta@5
DB_NAME=quiz_db
PORT=5000
```

### 5. Start the Application
#### Start Backend
```sh
cd backend
npm run dev
```
#### Start Frontend
```sh
cd frontend
npm run dev
```

## 📌 API Documentation
### 🔹 User Authentication
#### Login
**Endpoint:** `POST /api/auth/login`
**Request Body:**
```json
{
  "username": "teacher1",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "your_jwt_token"
}
```

### 🔹 Quizzes
#### Create a Quiz
**Endpoint:** `POST /api/quizzes`
**Request Body:**
```json
{
  "title": "Math Quiz",
  "description": "Basic algebra questions",
  "teacher_id": 1
}
```
**Response:**
```json
{
  "id": 1,
  "title": "Math Quiz",
  "description": "Basic algebra questions",
  "teacher_id": 1,
  "created_at": "2025-02-15T10:00:00Z"
}
```

## 📌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## 📌 License
This project is licensed under the MIT License.

## 📌 Contact
For any issues or inquiries, reach out via GitHub Issues.

