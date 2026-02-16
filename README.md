# User Task Management System — Backend

Backend services for the User Task Management System. This project is designed using a microservices-ready architecture and exposes REST APIs consumed by the Angular frontend.

The system handles authentication, users, tasks, and dashboard statistics.

---

## 🚀 Features

* User Authentication (Login / JWT Token)
* User Management APIs
* Task CRUD APIs
* Dashboard statistics aggregation
* Structured error handling
* Environment-based configuration
* Dockerized services
* Ready for microservices expansion

---

## 🧱 Architecture

The backend follows a layered architecture:

* Controller Layer → Handles HTTP requests
* Service Layer → Business logic
* Repository/Data Layer → Database operations
* DTO Layer → Request/response models

This separation makes the system scalable and maintainable.

---

## 📡 API Modules

| Module    | Description                        |
| --------- | ---------------------------------- |
| Auth      | Login and token generation         |
| Users     | Manage application users           |
| Tasks     | Create, update, delete, list tasks |
| Dashboard | Aggregated task statistics         |

---



## 🐳 Run Using Docker Compose (Recommended)

Start the backend services:

```bash
docker compose up --build
```

Stop services:

```bash
docker compose down
```

---

## 🔗 API Base URL

```
http://localhost:3000/api
```

---

## 🧪 Example Endpoints

### Authentication

```
POST /api/auth/login
```

### Tasks

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Dashboard

```
GET /api/dashboard/summary
```

---

## 🗄️ Database

The project uses a relational database. Tables include:

* users
* tasks

Future improvements include migrations and seed scripts.

---

## 🧩 Future Improvements

* Refresh tokens
* Role-based authorization
* Event-driven communication (message queue)
* Caching layer (Redis)
* API Gateway integration
* Logging & monitoring

---

## 🧑‍💻 Author

Maneesh Kumar

---

## 📄 License

This project is for learning and demonstration purposes.
