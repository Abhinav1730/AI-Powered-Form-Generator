'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import api from '@/app/utils/api';

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormSchema {
  title: string;
  description: string;
  fields: FormField[];
}

interface FormData {
  [key: string]: string | number | File[];
}

export default function FormPage() {
  const params = useParams();
  const formId = params.id as string;
  
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch form schema
  useEffect(() => {
    fetchFormSchema();
  }, [formId]);

  const fetchFormSchema = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/form/${formId}`);
      setFormSchema(response.data.form.formSchema);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to load form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: Array.from(event.target.files!)
      }));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add form responses
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== '') {
          formData.append(key, String(data[key]));
        }
      });
      
      // Add files
      Object.keys(files).forEach(fieldName => {
        if (files[fieldName] && files[fieldName].length > 0) {
          files[fieldName].forEach(file => {
            formData.append(fieldName, file);
          });
        }
      });

      // Submit to backend
      await api.post(`/submission/${formId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Show success and reset form
      setSuccess(true);
      reset();
      setFiles({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldName = field.name;
    const isRequired = field.required;
    const validation = field.validation || {};

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              minLength: validation.minLength ? {
                value: validation.minLength,
                message: `${field.label} must be at least ${validation.minLength} characters`
              } : undefined,
              maxLength: validation.maxLength ? {
                value: validation.maxLength,
                message: `${field.label} must be no more than ${validation.maxLength} characters`
              } : undefined,
              pattern: field.type === 'email' ? {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              } : validation.pattern ? {
                value: new RegExp(validation.pattern),
                message: `${field.label} format is invalid`
              } : undefined,
            })}
            type={field.type}
            id={fieldName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'number':
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              min: validation.min ? {
                value: validation.min,
                message: `${field.label} must be at least ${validation.min}`
              } : undefined,
              max: validation.max ? {
                value: validation.max,
                message: `${field.label} must be no more than ${validation.max}`
              } : undefined,
            })}
            type="number"
            id={fieldName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            id={fieldName}
            multiple
            onChange={(e) => handleFileChange(fieldName, e)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        );

      case 'textarea':
        return (
          <textarea
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              minLength: validation.minLength ? {
                value: validation.minLength,
                message: `${field.label} must be at least ${validation.minLength} characters`
              } : undefined,
              maxLength: validation.maxLength ? {
                value: validation.maxLength,
                message: `${field.label} must be no more than ${validation.maxLength} characters`
              } : undefined,
            })}
            id={fieldName}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      default:
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            type="text"
            id={fieldName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading form...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!formSchema) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            Form not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{formSchema.title}</h1>
          {formSchema.description && (
            <p className="mt-2 text-gray-600">{formSchema.description}</p>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-center">
            <p className="font-medium">Form submitted successfully!</p>
            <p className="text-sm mt-1">Thank you for your submission.</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formSchema.fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                <div className="mt-1">
                  {renderField(field)}
                </div>
                
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
