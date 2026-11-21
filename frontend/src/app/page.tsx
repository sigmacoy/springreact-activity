'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import { fetchStudents } from '@/services/studentService';
import { fetchTeachers } from '@/services/teacherService';
import { fetchCourses } from '@/services/courseService';

export default function DashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [students, teachers, courses] = await Promise.all([
        fetchStudents(),
        fetchTeachers(),
        fetchCourses(),
      ]);
      setStudentCount(students.length);
      setTeacherCount(teachers.length);
      setCourseCount(courses.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <Sidebar />
      <main className="page-content ml-64 md:ml-0">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Overview of students, teachers, and courses</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FFF0F0] border border-[#FFE0E0] rounded-md text-sm text-[#CC0000]">
            {error}
            <button
              onClick={loadStats}
              className="ml-4 text-sm font-medium underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse p-6 bg-white border border-[#E5E5E5]">
                <div className="h-4 w-32 bg-[#F0F0F0] rounded mb-4"></div>
                <div className="h-12 w-24 bg-[#F0F0F0] rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <DashboardStats studentCount={studentCount} teacherCount={teacherCount} courseCount={courseCount} />
        )}
      </main>
    </div>
  );
}