'use client';

import Link from 'next/link';

const icons = {
  students: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#999]" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  teachers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#999]" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M20 6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  courses: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#999]" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
};

interface DashboardStatsProps {
  studentCount: number;
  teacherCount: number;
  courseCount: number;
}

export default function DashboardStats({ studentCount, teacherCount, courseCount }: DashboardStatsProps) {
  const stats = [
    {
      label: 'Total Students',
      value: studentCount,
      href: '/students',
      icon: icons.students,
    },
    {
      label: 'Total Teachers',
      value: teacherCount,
      href: '/teachers',
      icon: icons.teachers,
    },
    {
      label: 'Total Courses',
      value: courseCount,
      href: '/courses',
      icon: icons.courses,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="group stat-card"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="stat-icon">
              {stat.icon}
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-link">View details →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}