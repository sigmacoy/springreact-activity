/**
 * Teacher Type Definitions
 *
 * These types represent the Teacher entity as returned by the backend API.
 */

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  department?: string | null;
}

export interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
}

export interface TeacherApiResponse {
  data: Teacher;
  message?: string;
}