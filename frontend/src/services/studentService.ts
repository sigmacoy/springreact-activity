/**
 * Student Service
 *
 * Handles all API calls related to Student management.
 */

import { apiGet, apiPost, apiDelete, ApiError } from './api';
import { Student, StudentFormData } from '@/types/student';

export async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await apiGet<Student[] | StudentResponse>('/students');

    // Handle both array response and paginated response
    if (Array.isArray(response)) {
      return response;
    }

    if ('students' in response) {
      return response.students;
    }

    // Fallback: assume it's an array
    return response as Student[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
    throw new Error('Failed to fetch students');
  }
}

export async function fetchStudentById(id: number | string): Promise<Student> {
  try {
    const response = await apiGet<Student>(`/students/${id}`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
    throw new Error('Failed to fetch student');
  }
}

export async function fetchStudentsByProgram(program: string): Promise<Student[]> {
  try {
    const response = await apiGet<Student[] | StudentResponse>(`/students/program/${encodeURIComponent(program)}`);

    if (Array.isArray(response)) {
      return response;
    }

    if ('students' in response) {
      return response.students;
    }

    return response as Student[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch students by program: ${error.message}`);
    }
    throw new Error('Failed to fetch students by program');
  }
}

export async function fetchStudentsByYearlevel(yearlevel: number): Promise<Student[]> {
  try {
    const response = await apiGet<Student[] | StudentResponse>(`/students/yearlevel/${yearlevel}`);

    if (Array.isArray(response)) {
      return response;
    }

    if ('students' in response) {
      return response.students;
    }

    return response as Student[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch students by year level: ${error.message}`);
    }
    throw new Error('Failed to fetch students by year level');
  }
}

export async function createStudent(data: StudentFormData): Promise<Student> {
  try {
    const payload = {
      firstname: data.firstname.trim(),
      lastname: data.lastname.trim(),
      program: data.program.trim(),
      ...(data.yearlevel !== undefined && { yearlevel: data.yearlevel }),
    };

    const response = await apiPost<Student>('/students', payload);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      const errorData = error.data as { message?: string; errors?: Record<string, string> } | undefined;
      if (errorData?.errors) {
        const messages = Object.values(errorData.errors).join(', ');
        throw new Error(`Validation error: ${messages}`);
      }
      throw new Error(`Failed to create student: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to create student');
  }
}

export async function deleteStudent(id: number | string): Promise<void> {
  try {
    await apiDelete<void>(`/students/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      const errorData = error.data as { message?: string } | undefined;
      throw new Error(`Failed to delete student: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to delete student');
  }
}

interface StudentResponse {
  students: Student[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}