# REST API Endpoint Documentation

**Base URL:** `http://localhost:8080`

**Content-Type:** `application/json`

---

## Teacher Endpoints

### 1. Create Teacher
**POST** `/api/teachers`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "department": "Computer Science"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "department": "Computer Science"
}
```

**Validation Errors (400 Bad Request):**
- Email already exists
- Invalid email format
- First/Last name required (max 50 chars)
- Email required (max 100 chars)
- Phone max 20 chars
- Department max 100 chars

---

### 2. Get All Teachers
**GET** `/api/teachers`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "department": "Computer Science"
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1-555-0456",
    "department": "Mathematics"
  }
]
```

---

### 3. Get Teacher by ID
**GET** `/api/teachers/{id}`

**Path Variable:**
- `id` (Long) - Teacher ID

**Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "department": "Computer Science"
}
```

**Response (404 Not Found):** Teacher not found

---

### 4. Update Teacher
**PUT** `/api/teachers/{id}`

**Path Variable:**
- `id` (Long) - Teacher ID

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@updated.com",
  "phone": "+1-555-0123",
  "department": "Computer Science"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@updated.com",
  "phone": "+1-555-0123",
  "department": "Computer Science"
}
```

**Response (404 Not Found):** Teacher not found
**Response (400 Bad Request):** Email already exists

---

### 5. Delete Teacher
**DELETE** `/api/teachers/{id}`

**Path Variable:**
- `id` (Long) - Teacher ID

**Response (204 No Content):** Successfully deleted

**Response (404 Not Found):** Teacher not found

**Response (409 Conflict):** Teacher has associated courses (remove courses first)

---

## Course Endpoints

### 1. Create Course
**POST** `/api/courses`

**Request Body:**
```json
{
  "name": "Introduction to Programming",
  "description": "Fundamentals of programming using Java",
  "courseCode": "CS101",
  "credits": 3,
  "teacher": {
    "id": 1
  }
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "Fundamentals of programming using Java",
  "courseCode": "CS101",
  "credits": 3,
  "teacher": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "department": "Computer Science"
  }
}
```

**Validation Errors (400 Bad Request):**
- Course code already exists
- Course name required (max 100 chars)
- Description max 500 chars
- Course code max 20 chars
- Teacher must exist

---

### 2. Get All Courses
**GET** `/api/courses`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Introduction to Programming",
    "description": "Fundamentals of programming using Java",
    "courseCode": "CS101",
    "credits": 3,
    "teacher": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-0123",
      "department": "Computer Science"
    }
  }
]
```

---

### 3. Get Course by ID
**GET** `/api/courses/{id}`

**Path Variable:**
- `id` (Long) - Course ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "Fundamentals of programming using Java",
  "courseCode": "CS101",
  "credits": 3,
  "teacher": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "department": "Computer Science"
  }
}
```

**Response (404 Not Found):** Course not found

---

### 4. Get Courses by Teacher ID
**GET** `/api/courses/teacher/{teacherId}`

**Path Variable:**
- `teacherId` (Long) - Teacher ID

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Introduction to Programming",
    "description": "Fundamentals of programming using Java",
    "courseCode": "CS101",
    "credits": 3,
    "teacher": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-0123",
      "department": "Computer Science"
    }
  },
  {
    "id": 2,
    "name": "Data Structures",
    "description": "Advanced data structures and algorithms",
    "courseCode": "CS201",
    "credits": 4,
    "teacher": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-0123",
      "department": "Computer Science"
    }
  }
]
```

---

### 5. Update Course
**PUT** `/api/courses/{id}`

**Path Variable:**
- `id` (Long) - Course ID

**Request Body:**
```json
{
  "name": "Advanced Programming",
  "description": "Advanced programming concepts",
  "courseCode": "CS101",
  "credits": 4,
  "teacher": {
    "id": 1
  }
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Advanced Programming",
  "description": "Advanced programming concepts",
  "courseCode": "CS101",
  "credits": 4,
  "teacher": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "department": "Computer Science"
  }
}
```

**Response (404 Not Found):** Course not found or Teacher not found
**Response (400 Bad Request):** Course code already exists

---

### 6. Delete Course
**DELETE** `/api/courses/{id}`

**Path Variable:**
- `id` (Long) - Course ID

**Response (204 No Content):** Successfully deleted

**Response (404 Not Found):** Course not found

---

## Entity Relationship

```
Teacher (1) ──────< (Many) Course
```

- **One Teacher** can handle **multiple Courses**
- **One Course** belongs to **one Teacher**
- Foreign Key: `courses.teacher_id` → `teachers.id`
- Cascade: Teacher deletion removes associated courses (orphanRemoval = true)

---

## JSON Serialization

**Infinite recursion prevention:**
- Teacher → `@JsonIgnore` on `courses` field
- Course → `@JsonIgnoreProperties({"courses", "hibernateLazyInitializer", "handler"})` on `teacher` field

**Result:** Teacher response excludes courses list; Course response includes teacher (without teacher's courses).

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Successful GET, PUT |
| 201 | Created - Successful POST |
| 204 | No Content - Successful DELETE |
| 400 | Bad Request - Validation error, duplicate |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Delete teacher with courses |

---

## Example cURL Commands

### Create Teacher
```bash
curl -X POST http://localhost:8080/api/teachers \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john.doe@example.com","phone":"+1-555-0123","department":"Computer Science"}'
```

### Get All Teachers
```bash
curl http://localhost:8080/api/teachers
```

### Get Teacher by ID
```bash
curl http://localhost:8080/api/teachers/1
```

### Create Course
```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Intro to Programming","description":"Java basics","courseCode":"CS101","credits":3,"teacher":{"id":1}}'
```

### Get All Courses
```bash
curl http://localhost:8080/api/courses
```

### Get Courses by Teacher
```bash
curl http://localhost:8080/api/courses/teacher/1
```