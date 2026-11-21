'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import { fetchStudents } from '@/services/studentService';
import { fetchTeachers } from '@/services/teacherService';
import { fetchCourses } from '@/services/courseService';

const features = [
  {
    title: 'Student Management',
    description: 'Track student enrollment, programs, and academic progress with a clean, intuitive interface.',
    href: '/students',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#666]" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Teacher Directory',
    description: 'Manage faculty information, departments, and contact details in one centralized location.',
    href: '/teachers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#666]" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M20 6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Course Catalog',
    description: 'Organize courses, assign instructors, and track credits with a streamlined workflow.',
    href: '/courses',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#666]" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

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
      <main className="page-content ml-0 md:ml-64">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Overview of students, teachers, and courses</p>
        </div>

        {error && (
          <div className="mb-6 alert-error" role="alert">
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
              <div key={i} className="stat-card animate-pulse pointer-events-none">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="h-4 w-32 loading-skeleton rounded mb-3"></div>
                    <div className="h-10 w-20 loading-skeleton rounded"></div>
                  </div>
                  <div className="w-10 h-10 loading-skeleton rounded"></div>
                </div>
                <div className="stat-footer">
                  <div className="h-4 w-24 loading-skeleton rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <DashboardStats studentCount={studentCount} teacherCount={teacherCount} courseCount={courseCount} />

            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-black">Quick Access</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="group block p-6 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#D0D0D0] hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg group-hover:border-[#D0D0D0] group-hover:bg-white transition-colors duration-200">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-black group-hover:text-[#1a1a1a] transition-colors">{feature.title}</h3>
                        <p className="mt-1 text-sm text-[#888] line-clamp-2">{feature.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
                      <span className="text-sm text-[#888] group-hover:text-black transition-colors">Open →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}