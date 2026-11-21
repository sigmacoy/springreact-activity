'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import TeacherTable from '@/components/TeacherTable';
import TeacherForm from '@/components/TeacherForm';
import { fetchTeachers, createTeacher, deleteTeacher } from '@/services/teacherService';
import { Teacher, TeacherFormData } from '@/types/teacher';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeacher = async (data: TeacherFormData) => {
    setIsSubmitting(true);
    try {
      const newTeacher = await createTeacher(data);
      setTeachers((prev) => [newTeacher, ...prev]);
      setShowForm(false);
      setSuccessMessage('Teacher created successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteTeacher = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setSuccessMessage('Teacher deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete teacher');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <Sidebar />
      <main className="page-content ml-64 md:ml-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">Teachers</h1>
            <p className="page-description">Manage teacher records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={isLoading}
          >
            Add Teacher
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
              onClick={loadTeachers}
              className="ml-4 text-sm font-medium underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="card">
          <TeacherTable
            teachers={teachers}
            isLoading={isLoading}
            error={error}
            onDelete={handleDeleteTeacher}
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md shadow-xl">
              <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
                <h2 className="text-xl font-medium text-black">Create Teacher</h2>
                <button
                  onClick={handleCancel}
                  className="text-[#737373] hover:text-black transition-colors"
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <TeacherForm
                  onSubmit={handleCreateTeacher}
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