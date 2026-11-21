'use client';

import { Teacher } from '@/types/teacher';

interface TeacherTableProps {
  teachers: Teacher[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number | string) => void;
}

export default function TeacherTable({ teachers, isLoading = false, error = null, onDelete }: TeacherTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-32 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-40 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-28 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-[#F0F0F0] rounded"></div>
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
        <p className="text-[#737373] mb-4">Failed to load teachers</p>
        <p className="text-sm text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-white border border-[#E5E5E5] p-12 text-center">
        <p className="text-[#737373] mb-4">No teachers found</p>
        <p className="text-sm text-[#999]">Get started by adding your first teacher</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E5E5] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{teacher.firstName} {teacher.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">
                  {teacher.phone || <span className="text-[#CCCCCC]">—</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">
                  {teacher.department || <span className="text-[#CCCCCC]">—</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {onDelete && (
                    <button
                      onClick={() => onDelete(teacher.id)}
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