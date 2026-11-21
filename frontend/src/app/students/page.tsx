'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StudentTable from '@/components/StudentTable';
import StudentForm from '@/components/StudentForm';
import { fetchStudents, createStudent, deleteStudent } from '@/services/studentService';
import { Student, StudentFormData } from '@/types/student';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStudent = async (data: StudentFormData) => {
    setIsSubmitting(true);
    try {
      const newStudent = await createStudent(data);
      setStudents((prev) => [newStudent, ...prev]);
      setShowForm(false);
      setSuccessMessage('Student created successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteStudent = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setSuccessMessage('Student deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete student');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <Sidebar />
      <main className="page-content ml-64 md:ml-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">Students</h1>
            <p className="page-description">Manage student records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={isLoading}
          >
            Add Student
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
              onClick={loadStudents}
              className="ml-4 text-sm font-medium underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="card">
          <StudentTable
            students={students}
            isLoading={isLoading}
            error={error}
            onDelete={handleDeleteStudent}
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md shadow-xl">
              <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
                <h2 className="text-xl font-medium text-black">Create Student</h2>
                <button
                  onClick={handleCancel}
                  className="text-[#737373] hover:text-black transition-colors"
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <StudentForm
                  onSubmit={handleCreateStudent}
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