'use client';

import { useState, useEffect } from 'react';
import { CourseFormData } from '@/types/course';
import { Teacher } from '@/types/teacher';
import { fetchTeachers } from '@/services/teacherService';

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<CourseFormData>;
}

type CourseFormErrors = {
  name?: string;
  courseCode?: string;
  description?: string;
  credits?: string;
  teacherId?: string;
};

export default function CourseForm({ onSubmit, onCancel, isSubmitting = false, initialData = {} }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    name: initialData.name || '',
    courseCode: initialData.courseCode || '',
    description: initialData.description || '',
    credits: initialData.credits || undefined,
    teacherId: initialData.teacherId || '',
  });

  const [errors, setErrors] = useState<CourseFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [teachersError, setTeachersError] = useState<string | null>(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setTeachersLoading(true);
      const data = await fetchTeachers();
      setTeachers(data);
    } catch (error) {
      setTeachersError(error instanceof Error ? error.message : 'Failed to load teachers');
    } finally {
      setTeachersLoading(false);
    }
  };

  const validate = (data: CourseFormData): boolean => {
    const newErrors: CourseFormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (!data.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required';
    } else if (!/^[A-Z0-9]{2,20}$/i.test(data.courseCode)) {
      newErrors.courseCode = 'Course code must be 2-20 alphanumeric characters';
    }

    if (data.credits !== undefined && (data.credits < 1 || data.credits > 10 || !Number.isInteger(data.credits))) {
      newErrors.credits = 'Credits must be an integer between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate(formData)) return;

    try {
      // Transform to match backend API: teacher should be { id: teacherId }
      const submitData = {
        name: formData.name.trim(),
        courseCode: formData.courseCode.trim().toUpperCase(),
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.credits && { credits: formData.credits }),
        ...(formData.teacherId && { teacher: { id: formData.teacherId } }),
      };
      await onSubmit(submitData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create course');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CourseFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClassName = (fieldName: keyof CourseFormErrors) =>
    `w-full px-4 py-3 border rounded-md text-sm transition-colors duration-150 ${
      errors[fieldName]
        ? 'border-[#CC0000] focus:border-[#CC0000] focus:ring-[#CC0000]'
        : 'border-[#E5E5E5] focus:border-black focus:ring-black'
    } bg-white placeholder-[#CCCCCC] focus:outline-none focus:ring-1`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="p-4 bg-[#FFF0F0] border border-[#FFE0E0] rounded-md text-sm text-[#CC0000]">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
            Course Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClassName('name')}
            placeholder="Introduction to Computer Science"
            disabled={isSubmitting}
            maxLength={100}
          />
          {errors.name && <p className="mt-1 text-sm text-[#CC0000]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="courseCode" className="block text-sm font-medium text-black mb-2">
            Course Code <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className={inputClassName('courseCode')}
            placeholder="CS101"
            maxLength={20}
            disabled={isSubmitting}
          />
          {errors.courseCode && <p className="mt-1 text-sm text-[#CC0000]">{errors.courseCode}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="credits" className="block text-sm font-medium text-black mb-2">
          Credits
        </label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={formData.credits ?? ''}
          onChange={handleChange}
          className={inputClassName('credits')}
          placeholder="3"
          min="1"
          max="10"
          disabled={isSubmitting}
        />
        {errors.credits && <p className="mt-1 text-sm text-[#CC0000]">{errors.credits}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-black mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`${inputClassName('description')} resize-y`}
          placeholder="Course description..."
          disabled={isSubmitting}
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="teacherId" className="block text-sm font-medium text-black mb-2">
          Teacher (Optional)
        </label>
        {teachersLoading ? (
          <div className="w-full px-4 py-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] text-sm text-[#737373]">
            Loading teachers...
          </div>
        ) : teachersError ? (
          <div className="w-full px-4 py-3 border border-[#E5E5E5] rounded-md bg-[#FFF0F0] text-sm text-[#CC0000]">
            Failed to load teachers: {teachersError}
          </div>
        ) : (
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className={inputClassName('teacherId')}
            disabled={isSubmitting}
          >
            <option value="">Select a teacher (optional)</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={String(teacher.id)}>
                {teacher.firstName} {teacher.lastName} ({teacher.email})
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {isSubmitting ? 'Creating...' : 'Create Course'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3 bg-white text-black text-sm font-medium rounded-md border border-[#E5E5E5] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}