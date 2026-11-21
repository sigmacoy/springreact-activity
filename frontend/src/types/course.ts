/**
 * Course Type Definitions
 *
 * These types represent the Course entity as returned by the backend API.
 */

export interface TeacherRef {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  department?: string | null;
}

export interface Course {
  id: number;
  name: string;
  courseCode: string;
  description?: string | null;
  credits?: number | null;
  teacher?: TeacherRef | null;
}

export interface CourseFormData {
  name: string;
  courseCode: string;
  description?: string;
  credits?: number;
  teacherId?: number | string;
}

export interface CourseApiResponse {
  data: Course;
  message?: string;
}