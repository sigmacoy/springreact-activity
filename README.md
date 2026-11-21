# Spring React Activity

Student Information Management System with Spring Boot and Next.js.

## Technology Stack

- Backend: Spring Boot 3, Java 17, MySQL, JPA/Hibernate
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Database: MySQL 8

## Prerequisites

- Java 17 or later
- Node.js 18 or later
- MySQL 8 running on localhost:3306
- Maven (bundled wrapper included)

## Quick Start

### Terminal 1 - Backend
```bash
lsof -ti:8080 | xargs kill -9 2>/dev/null; ./mvnw spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd frontend
lsof -ti:3000,5173 | xargs kill -9 2>/dev/null; npm run dev -- -p 5173
```

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api

## Features

- Student management (create, read, update, delete)
- Course management
- Teacher management
- Student-Course many-to-many relationship
- Course-Teacher many-to-one relationship
- Dashboard with statistics
- Form validation
- Responsive UI

## Project Structure

```
activity/
├── src/main/java/com/springreact/activity/
│   ├── controller/     # REST endpoints
│   ├── entity/         # JPA entities
│   ├── repository/     # Data access
│   └── service/        # Business logic
└── frontend/
    ├── src/app/        # Next.js pages
    ├── src/components/ # React components
    └── src/services/   # API calls
```

## Database

Tables created automatically on first run:
- `student`
- `course`
- `teacher`
- `student_course` (join table)

Configure connection in `src/main/resources/application.properties`.