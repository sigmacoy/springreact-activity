'use client';

import Link from 'next/link';

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
      icon: '🎓',
    },
    {
      label: 'Total Teachers',
      value: teacherCount,
      href: '/teachers',
      icon: '👨‍🏫',
    },
    {
      label: 'Total Courses',
      value: courseCount,
      href: '/courses',
      icon: '📚',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="group block p-6 bg-white border border-[#E5E5E5] hover:border-[#CCCCCC] hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#737373] font-medium mb-2">{stat.label}</p>
              <p className="text-3xl font-medium text-black group-hover:text-[#1a1a1a] transition-colors">
                {stat.value}
              </p>
            </div>
            <div className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
              {stat.icon}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
            <span className="text-sm text-[#737373]">View details →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}