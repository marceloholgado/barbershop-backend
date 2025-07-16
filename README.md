
# ✂️ TrimBook API

A RESTful API for managing barbershops, barbers, and client appointments. Built using **OpenAPI 3.0** standards and fully documented with **Swagger UI**.

<img width="1196" height="867" alt="image" src="https://github.com/user-attachments/assets/4593d4f7-6b22-4c5c-b71c-7513959802be" />

## 📌 Overview

TrimBook API allows you to:

- Register and authenticate users
- Create and retrieve barbershops by URL
- Manage barbers (add, list, remove)
- Schedule appointments with barbers
- View and update schedules
- Cancel appointments

---

## 🔗 API Base URL

```
http://localhost:5000
```

---

## 🔐 Authentication

Some routes require a valid **JWT token**.  
Use the `/login` route to authenticate and click **"Authorize"** in the Swagger UI to test secured endpoints.

---

## 🧪 Swagger Documentation

Interactive documentation is available at:

```
http://localhost:5000/docs
```

---

## 📁 Available Endpoints

### 👤 User

| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| POST   | `/api/trimbook/register`    | Register a new user       |
| POST   | `/api/trimbook/login`       | Authenticate and get JWT  |

---

### 💈 Barbershop

| Method | Endpoint                    | Description                      |
|--------|-----------------------------|----------------------------------|
| POST   | `/api/trimbook`             | Create a new barbershop          |
| GET    | `/api/trimbook/{url}`       | Get a barbershop by its URL      |

---

### 👨‍🔧 Barbers

| Method | Endpoint                                                           | Description                          |
|--------|--------------------------------------------------------------------|--------------------------------------|
| POST   | `/api/trimbook/{url}/barbers`                                      | Add a new barber                     |
| DELETE | `/api/trimbook/{url}/barbers`                                      | Remove a barber                      |
| GET    | `/api/trimbook/{url}/barbers`                                      | List all barbers in a barbershop     |
| GET    | `/api/trimbook/{url}/barbers/{barberId}/schedule`                 | View available schedule for a barber |

---

### 📅 Appointments

| Method | Endpoint                                                                 | Description                         |
|--------|--------------------------------------------------------------------------|-------------------------------------|
| POST   | `/api/trimbook/{url}/appointments`                                       | Create a new appointment            |
| PUT    | `/api/trimbook/{url}/barbers/{barberId}/appointments/{appointmentId}`   | Update an appointment               |
| DELETE | `/api/trimbook/{url}/barbers/{barberId}/appointments/{appointmentId}`   | Cancel/delete an appointment        |

---

## 🧰 Technologies Used

- Node.js / Express.js
- MongoDB Atlas
- JWT Authentication
- Swagger (OpenAPI)
- Mongoose ODM

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trimbook-api.git
   cd trimbook-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string and JWT secret:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/trimbook
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit Swagger UI:
   ```
   http://localhost:5000/docs
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋 About the Author

Developed by **Marcelo Holgado**  
[LinkedIn](https://www.linkedin.com/in/marcelo-holgado) • [GitHub](https://github.com/marceloholgado)
