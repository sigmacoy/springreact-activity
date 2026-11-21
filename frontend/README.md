# Course & Teacher Management System - Frontend

A minimalist Next.js frontend for managing courses and teachers, built with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Communication**: REST API (fetch)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Dashboard
│   │   ├── teachers/
│   │   │   └── page.tsx       # Teachers management
│   │   ├── courses/
│   │   │   └── page.tsx       # Courses management
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Navbar.tsx         # Top navigation
│   │   ├── Sidebar.tsx        # Side navigation
│   │   ├── DashboardStats.tsx # Dashboard statistics cards
│   │   ├── TeacherTable.tsx   # Teacher listing table
│   │   ├── CourseTable.tsx    # Course listing table
│   │   ├── TeacherForm.tsx    # Teacher creation form
│   │   └── CourseForm.tsx     # Course creation form
│   ├── services/
│   │   ├── api.ts             # Base API client
│   │   ├── teacherService.ts  # Teacher API calls
│   │   └── courseService.ts   # Course API calls
│   └── types/
│       ├── teacher.ts         # Teacher type definitions
│       └── course.ts          # Course type definitions
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Environment Configuration

Create a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Backend API Endpoints Expected

### Teachers
- `GET /api/teachers` - List all teachers
- `GET /api/teachers/{id}` - Get teacher by ID
- `POST /api/teachers` - Create a new teacher

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create a new course

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

The frontend follows a strict minimalist black-and-white aesthetic inspired by Linear, Vercel, and macOS applications:

- **Background**: `#FFFFFF`
- **Primary Text**: `#000000`
- **Secondary Text**: `#737373`
- **Borders**: `#E5E5E5`
- **Primary Buttons**: Black background with white text
- **Hover States**: Subtle gray transitions

## Features

### Dashboard
- Total teacher count
- Total course count
- Navigation to Teachers and Courses pages

### Teachers Page
- Teacher listing with name, email, department
- Add Teacher modal with validation
- Loading, empty, and error states
- Success feedback on creation

### Courses Page
- Course listing with name, code, credits, teacher
- Add Course modal with teacher dropdown
- Teacher selection fetches from `/api/teachers`
- Loading, empty, and error states
- Success feedback on creation

## API Integration Notes

The API services are designed to be flexible with backend response formats:

- Accepts both array responses (`[]`) and paginated responses (`{ data: [], total: 0 }`)
- Teacher/Course form payloads can be adjusted when backend implementation is available
- Error handling extracts validation errors from backend responses

## TypeScript Types

Types are defined in `src/types/` and are provisional - update them when the backend entity classes are available.

## CORS Configuration

The backend (Spring Boot) should allow requests from `http://localhost:3000`:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```