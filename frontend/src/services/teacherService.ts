/**
 * Teacher Service
 *
 * Handles all API calls related to Teacher management.
 * Update payload structures when backend implementation is available.
 */

import { apiGet, apiPost, apiDelete, ApiError } from './api';
import { Teacher, TeacherFormData } from '@/types/teacher';

export async function fetchTeachers(): Promise<Teacher[]> {
  try {
    const response = await apiGet<Teacher[] | TeacherResponse>('/teachers');

    // Handle both array response and paginated response
    if (Array.isArray(response)) {
      return response;
    }

    if ('teachers' in response) {
      return response.teachers;
    }

    // Fallback: assume it's an array
    return response as Teacher[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch teachers: ${error.message}`);
    }
    throw new Error('Failed to fetch teachers');
  }
}

export async function fetchTeacherById(id: number | string): Promise<Teacher> {
  try {
    const response = await apiGet<Teacher>(`/teachers/${id}`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch teacher: ${error.message}`);
    }
    throw new Error('Failed to fetch teacher');
  }
}

export async function createTeacher(data: TeacherFormData): Promise<Teacher> {
  try {
    // Transform form data to match expected backend payload
    const payload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      ...(data.phone && { phone: data.phone.trim() }),
      ...(data.department && { department: data.department.trim() }),
    };

    const response = await apiPost<Teacher>('/teachers', payload);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      // Try to extract validation errors from response
      const errorData = error.data as { message?: string; errors?: Record<string, string> } | undefined;
      if (errorData?.errors) {
        const messages = Object.values(errorData.errors).join(', ');
        throw new Error(`Validation error: ${messages}`);
      }
      throw new Error(`Failed to create teacher: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to create teacher');
  }
}

export async function deleteTeacher(id: number | string): Promise<void> {
  try {
    await apiDelete<void>(`/teachers/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      const errorData = error.data as { message?: string } | undefined;
      throw new Error(`Failed to delete teacher: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to delete teacher');
  }
}