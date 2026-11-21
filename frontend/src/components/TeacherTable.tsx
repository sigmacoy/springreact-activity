'use client';

import { Teacher } from '@/types/teacher';

interface TeacherTableProps {
  teachers: Teacher[];
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

export default function TeacherTable({ teachers, isLoading = false, error = null, onDelete }: TeacherTableProps) {
  if (isLoading) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td><div className="loading-skeleton h-4 w-32"></div></td>
                <td><div className="loading-skeleton h-4 w-40"></div></td>
                <td><div className="loading-skeleton h-4 w-28"></div></td>
                <td><div className="loading-skeleton h-4 w-24"></div></td>
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
        <p className="empty-state-title">Failed to load teachers</p>
        <p className="empty-state-description text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M20 6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v10" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <p className="empty-state-title">No teachers found</p>
        <p className="empty-state-description">Get started by adding your first teacher</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="font-medium text-black">{teacher.firstName} {teacher.lastName}</td>
              <td className="text-[#666]">{teacher.email}</td>
              <td className="text-[#666]">
                {teacher.phone || <span className="text-[#CCC]">—</span>}
              </td>
              <td className="text-[#666]">
                {teacher.department || <span className="text-[#CCC]">—</span>}
              </td>
              <td>
                {onDelete && (
                  <button
                    onClick={() => onDelete(teacher.id)}
                    className="btn-ghost text-[#CC0000] hover:bg-[#FFF5F5] p-2"
                    aria-label={`Delete ${teacher.firstName} ${teacher.lastName}`}
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