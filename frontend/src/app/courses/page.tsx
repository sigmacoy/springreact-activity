'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CourseTable from '@/components/CourseTable';
import CourseForm from '@/components/CourseForm';
import { fetchCourses, createCourse, deleteCourse } from '@/services/courseService';
import { Course, CourseFormData } from '@/types/course';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      const newCourse = await createCourse(data);
      setCourses((prev) => [newCourse, ...prev]);
      setShowForm(false);
      setSuccessMessage('Course created successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteCourse = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      setSuccessMessage('Course deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <Sidebar />
      <main className="page-content ml-64 md:ml-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">Courses</h1>
            <p className="page-description">Manage course records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={isLoading}
          >
            Add Course
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 success-message" role="alert">
            {successMessage}
          </div>
        )}

        {error && !isLoading && (
          <div className="mb-6 p-4 bg-[#FFF0F0] border border-[#FFE0E0] rounded-md text-sm text-[#CC0000]">
            {error}
            <button
              onClick={loadCourses}
              className="ml-4 text-sm font-medium underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="card">
          <CourseTable
            courses={courses}
            isLoading={isLoading}
            error={error}
            onDelete={handleDeleteCourse}
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md shadow-xl">
              <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
                <h2 className="text-xl font-medium text-black">Create Course</h2>
                <button
                  onClick={handleCancel}
                  className="text-[#737373] hover:text-black transition-colors"
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <CourseForm
                  onSubmit={handleCreateCourse}
                  onCancel={handleCancel}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}