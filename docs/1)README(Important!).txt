Project Overview (EduAccountingWebsite)

This project is an educational portal designed for managing registered students.
It helps administrators manage student information, registrations, courses, payments, and reports in a centralized and efficient way.

The system is built using a Full-Stack architecture with separate front-end and back-end components, and it includes the following technologies:

- React.js + Redux
- Spring Boot
- Redis
- MySQL
- JWT Token
- JPA
- Nginx
- Ant Design

Tools & Technologies Explained

React.js
React is a JavaScript library for building user interfaces.
In this project, React is used to create pages, forms, dashboards, and interactive components.

Redux
Redux is a state management library for React.
It manages application state centrally, allowing data (such as user info, student lists, filters, etc.) to be shared across components efficiently.

Spring Boot
Spring Boot is a Java framework for building fast and standardized back-end applications.
In this project, Spring Boot is responsible for creating APIs, implementing business logic, and connecting to the database.

Redis
Redis is an in-memory database that is extremely fast.
It is used for caching and session management to improve system performance and reduce database load.

MySQL
MySQL is a relational database management system (RDBMS).
All main data such as students, classes, payments, and registration information are stored in MySQL.

JWT Token
JWT (JSON Web Token) is used for authentication and session management.
After a user logs in, a token is issued and all subsequent requests use this token for authentication.

JPA (Java Persistence API)
JPA is a standard for database access in Java.
With JPA in Spring Boot, CRUD operations and data persistence are performed in a clean and standardized way.

Nginx
Nginx is a powerful web server used for routing requests, load balancing, and serving static files.
In this project, Nginx is used to manage incoming requests and route them to front-end and back-end services.

Ant Design
Ant Design is a UI component library for React that provides ready-made and professional components.
It is used for building dashboards, forms, tables, and overall user interface design.

Setup Instructions

The complete setup and execution guide is provided in the file SET_UP.txt.

The complete Guide of controling sql is provided in the file ADMIN_SQL.txt.
