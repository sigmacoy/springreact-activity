'use client';

import { Course } from '@/types/course';

interface CourseTableProps {
  courses: Course[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number | string) => void;
}

export default function CourseTable({ courses, isLoading = false, error = null, onDelete }: CourseTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Course Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-40 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-20 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-12 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-32 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-8 w-20 bg-[#F0F0F0] rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-[#E5E5E5] p-12 text-center">
        <p className="text-[#737373] mb-4">Failed to load courses</p>
        <p className="text-sm text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white border border-[#E5E5E5] p-12 text-center">
        <p className="text-[#737373] mb-4">No courses found</p>
        <p className="text-sm text-[#999]">Get started by adding your first course</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E5E5] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Course Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Credits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{course.name}</div>
                  {course.description && (
                    <div className="text-sm text-[#737373] truncate max-w-xs">{course.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373] font-mono text-sm">{course.courseCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">
                  {course.credits !== undefined ? course.credits : <span className="text-[#CCCCCC]">—</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.teacher ? (
                    <span className="text-black">{course.teacher.firstName} {course.teacher.lastName}</span>
                  ) : (
                    <span className="text-[#CCCCCC]">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {onDelete && (
                    <button
                      onClick={() => onDelete(course.id)}
                      className="text-sm text-[#CC0000] hover:text-[#990000] font-medium transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}