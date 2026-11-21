'use client';

import { Student } from '@/types/student';

interface StudentTableProps {
  students: Student[];
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

export default function StudentTable({ students, isLoading = false, error = null, onDelete }: StudentTableProps) {
  if (isLoading) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Program</th>
              <th>Year Level</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td><div className="loading-skeleton h-4 w-24"></div></td>
                <td><div className="loading-skeleton h-4 w-24"></div></td>
                <td><div className="loading-skeleton h-4 w-32"></div></td>
                <td><div className="loading-skeleton h-4 w-12"></div></td>
                <td><div className="loading-skeleton h-4 w-20"></div></td>
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
        <p className="empty-state-title">Failed to load students</p>
        <p className="empty-state-description text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p className="empty-state-title">No students found</p>
        <p className="empty-state-description">Get started by adding your first student</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Program</th>
            <th>Year Level</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="font-medium text-black">{student.firstname}</td>
              <td className="font-medium text-black">{student.lastname}</td>
              <td className="text-[#666]">{student.program}</td>
              <td className="text-[#666]">
                {student.yearlevel !== undefined ? student.yearlevel : <span className="text-[#CCC]">—</span>}
              </td>
              <td className="text-[#666]">
                {student.courses && student.courses.length > 0 ? (
                  <span>{student.courses.length} course(s)</span>
                ) : (
                  <span className="text-[#CCC]">—</span>
                )}
              </td>
              <td>
                {onDelete && (
                  <button
                    onClick={() => onDelete(student.id)}
                    className="btn-ghost text-[#CC0000] hover:bg-[#FFF5F5] p-2"
                    aria-label={`Delete ${student.firstname} ${student.lastname}`}
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