'use client';

import { Student } from '@/types/student';

interface StudentTableProps {
  students: Student[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number | string) => void;
}

export default function StudentTable({ students, isLoading = false, error = null, onDelete }: StudentTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Year Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-32 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-12 bg-[#F0F0F0] rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-20 bg-[#F0F0F0] rounded"></div>
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
        <p className="text-[#737373] mb-4">Failed to load students</p>
        <p className="text-sm text-[#CC0000]">{error}</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white border border-[#E5E5E5] p-12 text-center">
        <p className="text-[#737373] mb-4">No students found</p>
        <p className="text-sm text-[#999]">Get started by adding your first student</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E5E5] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Year Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Courses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{student.firstname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{student.lastname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">{student.program}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">
                  {student.yearlevel !== undefined ? student.yearlevel : <span className="text-[#CCCCCC]">—</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#737373]">
                  {student.courses && student.courses.length > 0 ? (
                    <span>{student.courses.length} course(s)</span>
                  ) : (
                    <span className="text-[#CCCCCC]">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {onDelete && (
                    <button
                      onClick={() => onDelete(student.id)}
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