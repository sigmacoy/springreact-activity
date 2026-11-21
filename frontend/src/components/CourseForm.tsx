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

    if (!data.teacherId) {
      newErrors.teacherId = 'Teacher is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate(formData)) return;

    try {
      // Pass raw formData to onSubmit; courseService handles the transformation
      const submitData = {
        name: formData.name.trim(),
        courseCode: formData.courseCode.trim().toUpperCase(),
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.credits && { credits: formData.credits }),
        ...(formData.teacherId && { teacherId: formData.teacherId }),
      };
      await onSubmit(submitData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create course');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'credits' && value !== '' ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    if (errors[name as keyof CourseFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClassName = (fieldName: keyof CourseFormErrors) =>
    `input ${errors[fieldName] ? 'input-error' : ''}`;

  const selectClassName = (fieldName: keyof CourseFormErrors) =>
    `select ${errors[fieldName] ? 'input-error' : ''}`;

  const textareaClassName = (fieldName: keyof CourseFormErrors) =>
    `textarea ${errors[fieldName] ? 'input-error' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="alert-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label">
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
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="error-message" role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="courseCode" className="label">
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
            aria-invalid={errors.courseCode ? 'true' : 'false'}
            aria-describedby={errors.courseCode ? 'courseCode-error' : undefined}
          />
          {errors.courseCode && <p id="courseCode-error" className="error-message" role="alert">{errors.courseCode}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="credits" className="label">
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
          aria-invalid={errors.credits ? 'true' : 'false'}
          aria-describedby={errors.credits ? 'credits-error' : undefined}
        />
        {errors.credits && <p id="credits-error" className="error-message" role="alert">{errors.credits}</p>}
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={textareaClassName('description')}
          placeholder="Course description..."
          disabled={isSubmitting}
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="teacherId" className="label">
          Teacher <span className="text-[#CC0000]">*</span>
        </label>
        {teachersLoading ? (
          <div className="input bg-[#FAFAFA] text-[#888] cursor-wait" aria-busy="true">
            Loading teachers...
          </div>
        ) : teachersError ? (
          <div className="input bg-[#FFF5F5] border-[#FFE0E0] text-[#CC0000]" role="alert">
            Failed to load teachers: {teachersError}
          </div>
        ) : (
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className={selectClassName('teacherId')}
            disabled={isSubmitting}
            required
            aria-invalid={errors.teacherId ? 'true' : 'false'}
            aria-describedby={errors.teacherId ? 'teacherId-error' : undefined}
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={String(teacher.id)}>
                {teacher.firstName} {teacher.lastName} ({teacher.email})
              </option>
            ))}
          </select>
        )}
        {errors.teacherId && <p id="teacherId-error" className="error-message" role="alert">{errors.teacherId}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E8E8]">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Creating...' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}