'use client';

import { useState } from 'react';
import { TeacherFormData } from '@/types/teacher';

interface TeacherFormProps {
  onSubmit: (data: TeacherFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<TeacherFormData>;
}

export default function TeacherForm({ onSubmit, onCancel, isSubmitting = false, initialData = {} }: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherFormData>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    department: initialData.department || '',
  });

  const [errors, setErrors] = useState<Partial<TeacherFormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (data: TeacherFormData): boolean => {
    const newErrors: Partial<TeacherFormData> = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (data.phone && !/^[\d\s\-+()]{1,20}$/.test(data.phone)) {
      newErrors.phone = 'Invalid phone format (max 20 characters)';
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
      setSubmitError(error instanceof Error ? error.message : 'Failed to create teacher');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof TeacherFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClassName = (fieldName: keyof TeacherFormData) =>
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
          <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
            First Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClassName('firstName')}
            placeholder="John"
            disabled={isSubmitting}
            maxLength={50}
          />
          {errors.firstName && <p className="mt-1 text-sm text-[#CC0000]">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
            Last Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClassName('lastName')}
            placeholder="Doe"
            disabled={isSubmitting}
            maxLength={50}
          />
          {errors.lastName && <p className="mt-1 text-sm text-[#CC0000]">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
          Email <span className="text-[#CC0000]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClassName('email')}
          placeholder="john.doe@example.com"
          disabled={isSubmitting}
          maxLength={100}
        />
        {errors.email && <p className="mt-1 text-sm text-[#CC0000]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClassName('phone')}
          placeholder="+1-555-0123"
          disabled={isSubmitting}
          maxLength={20}
        />
        {errors.phone && <p className="mt-1 text-sm text-[#CC0000]">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-black mb-2">
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={inputClassName('department')}
          placeholder="Computer Science"
          disabled={isSubmitting}
          maxLength={100}
        />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {isSubmitting ? 'Creating...' : 'Create Teacher'}
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