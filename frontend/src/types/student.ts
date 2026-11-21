/**
 * Student Type Definitions
 *
 * These types represent the Student entity as returned by the backend API.
 */

export interface CourseRef {
  id: number;
  name: string;
  courseCode: string;
  credits?: number | null;
}

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  program: string;
  yearlevel?: number | null;
  courses?: CourseRef[];
}

export interface StudentFormData {
  firstname: string;
  lastname: string;
  program: string;
  yearlevel?: number;
}

export interface StudentApiResponse {
  data: Student;
  message?: string;
}