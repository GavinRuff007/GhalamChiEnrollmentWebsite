# 🎓 EduAccountingWebsite

## 📌 Project Overview

**EduAccountingWebsite** is a full-stack educational management system
designed to efficiently manage registered students.

The system allows administrators to manage:

-   👨‍🎓 Student Information\
-   📝 Registrations\
-   📚 Courses & Classes\
-   💳 Payments\
-   📊 Reports & Statistics

This platform centralizes academic accounting operations in a secure,
scalable, and high-performance architecture.

------------------------------------------------------------------------

## 🏗️ Architecture

The project follows a Full-Stack Architecture with clearly separated
front-end and back-end services.

-   Frontend: React.js + Redux Toolkit
-   Backend: Spring Boot
-   Database: MySQL
-   Cache & Session: Redis
-   Reverse Proxy: Nginx
-   Authentication: JWT
-   Containerization: Docker

------------------------------------------------------------------------

# 🖥️ Frontend (React)

### ⚛ React.js

A modern JavaScript library for building interactive user interfaces.

Used for: - Dynamic pages - Admin dashboards - Forms - Student
management panels

### 🧠 Redux Toolkit

Centralized state management for: - User authentication state - Student
lists - Filters - Global application state

### 🎨 Ant Design

Professional UI component library used for: - Tables - Forms - Modals -
Layout - Dashboard components

------------------------------------------------------------------------

# 🔙 Backend (Spring Boot)

### 🚀 Spring Boot

Backend framework responsible for: - RESTful APIs - Business Logic -
Database integration - Validation - Security configuration

### 🔐 Spring Security + JWT

Authentication and authorization using: - JSON Web Tokens (JWT) -
Role-based access control - Secure API endpoints

### 🗄️ JPA (Java Persistence API)

Used for: - CRUD operations - Entity management - Clean database
abstraction layer

### ⚡ Redis

In-memory database used for: - Caching - Session management - Reducing
database load - Improving performance

### 🐬 MySQL

Relational database storing: - Students - Courses - Payments -
Registrations - Admin data

------------------------------------------------------------------------

# 🌐 Infrastructure & Deployment

### 🔁 Nginx

Used as: - Reverse proxy - Request router - Static file server - Load
balancer (if scaled)

### 🐳 Docker

Containerized services for: - Backend - Frontend - Redis - MySQL

Ensures: - Environment consistency - Easy deployment - Scalability

------------------------------------------------------------------------

# 🔐 Authentication Flow

1.  User logs in.
2.  Server validates credentials.
3.  JWT token is generated.
4.  Token is sent to client.
5.  All future requests include the JWT token.
6.  Spring Security validates the token on each request.

------------------------------------------------------------------------

# 📂 Project Structure (High-Level)

    EduAccountingWebsite/
    │
    ├── frontend/        # React + Redux Toolkit
    ├── backend/         # Spring Boot Application
    ├── nginx/           # Nginx configuration
    ├── docker-compose.yml
    ├── SET_UP.txt
    └── ADMIN_SQL.txt

------------------------------------------------------------------------

# ⚙️ Setup Instructions

Complete setup guide is available in:

docs/SET_UP.txt

Includes: - Docker setup - Database configuration - Environment
variables - Running services

------------------------------------------------------------------------

# 🛠️ SQL Administration Guide

SQL management and control guide:

docs/ADMIN_SQL.txt

Includes: - Database structure - Manual queries - Admin control
operations

------------------------------------------------------------------------

# ✨ Key Features

-   Secure JWT-based authentication
-   Role-based access control
-   Student & Course management
-   Payment tracking
-   Dashboard analytics
-   Optimized performance using Redis
-   Containerized deployment
-   Clean MVC architecture
-   Scalable infrastructure

------------------------------------------------------------------------

# 📈 Performance & Scalability

-   Redis caching reduces database pressure
-   Nginx handles routing and static serving
-   Docker enables horizontal scaling
-   Stateless JWT authentication improves scalability

------------------------------------------------------------------------

# 🧑‍💻 Author

Developed as a Full-Stack Educational Accounting System using modern
enterprise technologies.
