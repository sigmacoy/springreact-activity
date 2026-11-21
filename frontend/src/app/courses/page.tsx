'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CourseTable from '@/components/CourseTable';
import CourseForm from '@/components/CourseForm';
import { fetchCourses, createCourse, deleteCourse } from '@/services/courseService';
import { Course, CourseFormData } from '@/types/course';

const plusIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const closeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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
      <main className="page-content ml-0 md:ml-64">
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
            {plusIcon}
            Add Course
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 success-message" role="alert">
            {successMessage}
          </div>
        )}

        {error && !isLoading && (
          <div className="mb-6 alert-error" role="alert">
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
          <div className="modal-overlay" onClick={handleCancel} role="dialog" aria-modal="true" aria-labelledby="course-form-title">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 id="course-form-title" className="modal-title">Create Course</h2>
                <button
                  onClick={handleCancel}
                  className="modal-close"
                  disabled={isSubmitting}
                  aria-label="Close form"
                >
                  {closeIcon}
                </button>
              </div>
              <div className="modal-body">
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