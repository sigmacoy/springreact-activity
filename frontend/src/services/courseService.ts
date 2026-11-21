/**
 * Course Service
 *
 * Handles all API calls related to Course management.
 * Update payload structures when backend implementation is available.
 */

import { apiGet, apiPost, apiDelete, ApiError } from './api';
import { Course, CourseFormData } from '@/types/course';

export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await apiGet<Course[] | CourseResponse>('/courses');

    // Handle both array response and paginated response
    if (Array.isArray(response)) {
      return response;
    }

    if ('courses' in response) {
      return response.courses;
    }

    // Fallback: assume it's an array
    return response as Course[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }
    throw new Error('Failed to fetch courses');
  }
}

export async function fetchCourseById(id: number | string): Promise<Course> {
  try {
    const response = await apiGet<Course>(`/courses/${id}`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch course: ${error.message}`);
    }
    throw new Error('Failed to fetch course');
  }
}

export async function createCourse(data: CourseFormData): Promise<Course> {
  try {
    // Transform form data to match expected backend payload
    // Backend expects: teacher: { id } not teacherId
    const payload = {
      name: data.name.trim(),
      courseCode: data.courseCode.trim().toUpperCase(),
      ...(data.description && { description: data.description.trim() }),
      ...(data.credits && { credits: data.credits }),
      ...(data.teacherId && { teacher: { id: data.teacherId } }),
    };

    const response = await apiPost<Course>('/courses', payload);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      const errorData = error.data as { message?: string; errors?: Record<string, string> } | undefined;
      if (errorData?.errors) {
        const messages = Object.values(errorData.errors).join(', ');
        throw new Error(`Validation error: ${messages}`);
      }
      throw new Error(`Failed to create course: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to create course');
  }
}

export async function deleteCourse(id: number | string): Promise<void> {
  try {
    await apiDelete<void>(`/courses/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      const errorData = error.data as { message?: string } | undefined;
      throw new Error(`Failed to delete course: ${errorData?.message || error.message}`);
    }
    throw new Error('Failed to delete course');
  }
}