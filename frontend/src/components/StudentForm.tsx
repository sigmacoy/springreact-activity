'use client';

import { useState } from 'react';
import { StudentFormData } from '@/types/student';

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<StudentFormData>;
}

export default function StudentForm({ onSubmit, onCancel, isSubmitting = false, initialData = {} }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    firstname: initialData.firstname || '',
    lastname: initialData.lastname || '',
    program: initialData.program || '',
    yearlevel: initialData.yearlevel || undefined,
  });

  const [errors, setErrors] = useState<Partial<StudentFormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (data: StudentFormData): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!data.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    if (!data.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    if (!data.program.trim()) {
      newErrors.program = 'Program is required';
    }

    if (data.yearlevel !== undefined && (data.yearlevel < 1 || data.yearlevel > 10 || !Number.isInteger(data.yearlevel))) {
      newErrors.yearlevel = 'Year level must be an integer between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate(formData)) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create student');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StudentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClassName = (fieldName: keyof StudentFormData) =>
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
          <label htmlFor="firstname" className="block text-sm font-medium text-black mb-2">
            First Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={inputClassName('firstname')}
            placeholder="Von"
            disabled={isSubmitting}
            maxLength={50}
          />
          {errors.firstname && <p className="mt-1 text-sm text-[#CC0000]">{errors.firstname}</p>}
        </div>

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-black mb-2">
            Last Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={inputClassName('lastname')}
            placeholder="Godinez"
            disabled={isSubmitting}
            maxLength={50}
          />
          {errors.lastname && <p className="mt-1 text-sm text-[#CC0000]">{errors.lastname}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="program" className="block text-sm font-medium text-black mb-2">
          Program <span className="text-[#CC0000]">*</span>
        </label>
        <select
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className={inputClassName('program')}
          disabled={isSubmitting}
        >
          <option value="">Select a program</option>
          <option value="BSIT">BSIT - Bachelor of Science in Information Technology</option>
          <option value="BSCS">BSCS - Bachelor of Science in Computer Science</option>
          <option value="BSIS">BSIS - Bachelor of Science in Information Systems</option>
          <option value="ACT">ACT - Associate in Computer Technology</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.program && <p className="mt-1 text-sm text-[#CC0000]">{errors.program}</p>}
      </div>

      <div>
        <label htmlFor="yearlevel" className="block text-sm font-medium text-black mb-2">
          Year Level
        </label>
        <input
          type="number"
          id="yearlevel"
          name="yearlevel"
          value={formData.yearlevel ?? ''}
          onChange={handleChange}
          className={inputClassName('yearlevel')}
          placeholder="3"
          min="1"
          max="10"
          disabled={isSubmitting}
        />
        {errors.yearlevel && <p className="mt-1 text-sm text-[#CC0000]">{errors.yearlevel}</p>}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {isSubmitting ? 'Creating...' : 'Create Student'}
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