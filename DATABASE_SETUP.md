# MySQL Database Setup Instructions

## Prerequisites

- **MySQL Server** installed and running (via MySQL Workbench or standalone)
- **MySQL Workbench** for database management
- **Java 17** (OpenJDK 26 Oracle aarch64)
- **Maven** (Bundled Maven 3 via IntelliJ IDEA)

---

## 1. Start MySQL Server

Ensure MySQL server is running:
- **Via MySQL Workbench**: Open MySQL Workbench → Connect to your local instance → Verify connection
- **Via macOS**: `brew services start mysql` (if installed via Homebrew)
- **Via system service**: `sudo systemctl start mysqld` (Linux) or Windows Services

---

## 2. Create Database

The application is configured to **auto-create** the database (`activity_db`) on startup via:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/activity_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

**Option A: Automatic (Recommended)**
- No manual steps needed. Run the Spring Boot application and the database will be created automatically.

**Option B: Manual Creation via MySQL Workbench**
1. Open **MySQL Workbench**
2. Connect to your local MySQL instance
3. Execute the following SQL:
```sql
CREATE DATABASE activity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
4. Verify in the Schemas panel (refresh if needed)

---

## 3. Database Credentials

| Property | Value |
|----------|-------|
| Host | `localhost` |
| Port | `3306` |
| Database | `activity_db` |
| Username | `root` |
| Password | *(your MySQL root password)* |

> **Note:** These are configured in `src/main/resources/application.properties`. Update the `spring.datasource.password` if your MySQL root user has a password (default is empty for fresh installs, but MySQL Workbench typically prompts you to set one during setup).

---

## 4. Hibernate DDL Configuration

```properties
spring.jpa.hibernate.ddl-auto=update
```

- **update**: Creates tables if missing, updates schema on entity changes (development)
- Tables created: `teachers`, `courses`
- Foreign key: `courses.teacher_id` → `teachers.id`

---

## 5. Verify Tables After Application Start

```sql
USE activity_db;

-- Check teachers table
DESCRIBE teachers;

-- Check courses table
DESCRIBE courses;

-- Verify foreign key
SHOW CREATE TABLE courses;
```

Expected schema:

**teachers**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| first_name | VARCHAR(50) | NOT NULL |
| last_name | VARCHAR(50) | NOT NULL |
| email | VARCHAR(100) | NOT NULL, UNIQUE |
| phone | VARCHAR(20) | |
| department | VARCHAR(100) | |

**courses**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| description | VARCHAR(500) | |
| course_code | VARCHAR(20) | UNIQUE |
| credits | INT | |
| teacher_id | BIGINT | NOT NULL, FK → teachers(id) |

---

## 6. IntelliJ IDEA Configuration

### A. Java Compiler
- Settings → Build, Execution, Deployment → Compiler → Java Compiler
- **Target bytecode version**: 17 (Same as language level)

### B. Maven
- Settings → Build, Execution, Deployment → Build Tools → Maven
- **Maven home path**: Bundled Maven 3

### C. Project SDK
- File → Project Structure → Project
- **SDK**: OpenJDK 26 Oracle aarch64
- **Language level**: SDK default (17)

### D. Maven Runner
- Settings → Build, Execution, Deployment → Build Tools → Maven → Runner
- ✅ **Delegate IDE build/run actions to Maven**

---

## 7. Run the Application

```bash
# From project root
./mvnw spring-boot:run
```

Or in IntelliJ:
1. Open `ActivityApplication.java`
2. Click **Run** (green play button)

---

## 8. Verify Application Startup

Check console for:
```
Hibernate: create table teachers (...)
Hibernate: create table courses (...)
...
Started ActivityApplication in X.XXX seconds
```

Access API at: `http://localhost:8080/api/teachers` or `http://localhost:8080/api/courses`

---

## 9. Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Ensure MySQL server is running (check MySQL Workbench connection) |
| Access denied | Check username/password in application.properties |
| Database not found | Enable `createDatabaseIfNotExist=true` in URL or create manually via Workbench |
| Table not created | Check `spring.jpa.hibernate.ddl-auto=update` |
| Port 8080 in use | Change `server.port` in application.properties |

---

## 10. Reset Database (Development)

To completely reset via MySQL Workbench:
1. Connect to MySQL in Workbench
2. Execute:
```sql
DROP DATABASE activity_db;
CREATE DATABASE activity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Restart application to recreate tables.