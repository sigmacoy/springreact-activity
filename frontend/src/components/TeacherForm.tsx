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
    `input ${errors[fieldName] ? 'input-error' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="alert-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="label">
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
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && <p id="firstName-error" className="error-message" role="alert">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="label">
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
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && <p id="lastName-error" className="error-message" role="alert">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label">
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
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="error-message" role="alert">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="label">
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
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && <p id="phone-error" className="error-message" role="alert">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="department" className="label">
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
          {isSubmitting ? 'Creating...' : 'Create Teacher'}
        </button>
      </div>
    </form>
  );
}