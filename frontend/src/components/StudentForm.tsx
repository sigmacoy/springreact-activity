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

  interface FormDataRaw {
    firstname: string;
    lastname: string;
    program: string;
    yearlevel?: string | number;
  }

  const validate = (data: FormDataRaw): boolean => {
    const newErrors: Partial<FormDataRaw> = {};

    if (!data.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    if (!data.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    if (!data.program.trim()) {
      newErrors.program = 'Program is required';
    }

    const yearLevelNum = data.yearlevel !== undefined && data.yearlevel !== '' ? Number(data.yearlevel) : undefined;
    if (yearLevelNum !== undefined && (yearLevelNum < 1 || yearLevelNum > 10 || !Number.isInteger(yearLevelNum))) {
      newErrors.yearlevel = 'Year level must be an integer between 1 and 10';
    }

    setErrors(newErrors as Partial<StudentFormData>);
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
    `input ${errors[fieldName] ? 'input-error' : ''}`;

  const selectClassName = (fieldName: keyof StudentFormData) =>
    `select ${errors[fieldName] ? 'input-error' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="alert-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstname" className="label">
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
            aria-invalid={errors.firstname ? 'true' : 'false'}
            aria-describedby={errors.firstname ? 'firstname-error' : undefined}
          />
          {errors.firstname && <p id="firstname-error" className="error-message" role="alert">{errors.firstname}</p>}
        </div>

        <div>
          <label htmlFor="lastname" className="label">
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
            aria-invalid={errors.lastname ? 'true' : 'false'}
            aria-describedby={errors.lastname ? 'lastname-error' : undefined}
          />
          {errors.lastname && <p id="lastname-error" className="error-message" role="alert">{errors.lastname}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="program" className="label">
          Program <span className="text-[#CC0000]">*</span>
        </label>
        <select
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className={selectClassName('program')}
          disabled={isSubmitting}
          aria-invalid={errors.program ? 'true' : 'false'}
          aria-describedby={errors.program ? 'program-error' : undefined}
        >
          <option value="">Select a program</option>
          <option value="BSIT">BSIT - Bachelor of Science in Information Technology</option>
          <option value="BSCS">BSCS - Bachelor of Science in Computer Science</option>
          <option value="BSIS">BSIS - Bachelor of Science in Information Systems</option>
          <option value="ACT">ACT - Associate in Computer Technology</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.program && <p id="program-error" className="error-message" role="alert">{errors.program}</p>}
      </div>

      <div>
        <label htmlFor="yearlevel" className="label">
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
          aria-invalid={errors.yearlevel ? 'true' : 'false'}
          aria-describedby={errors.yearlevel ? 'yearlevel-error' : undefined}
        />
        {errors.yearlevel && <p id="yearlevel-error" className="error-message" role="alert">{errors.yearlevel}</p>}
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
          {isSubmitting ? 'Creating...' : 'Create Student'}
        </button>
      </div>
    </form>
  );
}