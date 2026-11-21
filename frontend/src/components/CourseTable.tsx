'use client';

import { Course } from '@/types/course';

interface CourseTableProps {
  courses: Course[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number | string) => void;
}

const deleteIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function CourseTable({ courses, isLoading = false, error = null, onDelete }: CourseTableProps) {
  if (isLoading) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Credits</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td><div className="loading-skeleton h-4 w-40"></div></td>
                <td><div className="loading-skeleton h-4 w-20"></div></td>
                <td><div className="loading-skeleton h-4 w-12"></div></td>
                <td><div className="loading-skeleton h-4 w-32"></div></td>
                <td><div className="loading-skeleton h-8 w-20"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="empty-state-title">Failed to load courses</p>
        <p className="empty-state-description text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <p className="empty-state-title">No courses found</p>
        <p className="empty-state-description">Get started by adding your first course</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Credits</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <div className="font-medium text-black">{course.name}</div>
                {course.description && (
                  <div className="text-sm text-[#888] truncate max-w-xs mt-1">{course.description}</div>
                )}
              </td>
              <td className="text-[#666] font-mono text-sm">{course.courseCode}</td>
              <td className="text-[#666]">
                {course.credits !== undefined ? course.credits : <span className="text-[#CCC]">—</span>}
              </td>
              <td className="text-[#666]">
                {course.teacher ? (
                  <span className="text-black">{course.teacher.firstName} {course.teacher.lastName}</span>
                ) : (
                  <span className="text-[#CCC]">Unassigned</span>
                )}
              </td>
              <td>
                {onDelete && (
                  <button
                    onClick={() => onDelete(course.id)}
                    className="btn-ghost text-[#CC0000] hover:bg-[#FFF5F5] p-2"
                    aria-label={`Delete ${course.name}`}
                  >
                    {deleteIcon}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}