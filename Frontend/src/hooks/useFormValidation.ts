import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormValidationOptions<T extends z.ZodSchema<any>> {
  schema: T;
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
}

export const useFormValidation = <T extends z.ZodSchema<any>>(
  options: UseFormValidationOptions<T>
) => {
  type FormData = z.infer<T>;
  
  const [values, setValues] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof FormData, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when value changes
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const setTouched = useCallback((field: keyof FormData) => {
    setTouchedState(prev => ({ ...prev, [field]: true }));

    // Validate field on blur if mode is onBlur
    if (options.mode === 'onBlur') {
      validateField(field);
    }
  }, [options.mode, values]);

  const setError = useCallback((field: keyof FormData, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const validateField = useCallback((field: keyof FormData) => {
    try {
      if (options.schema instanceof z.ZodObject) {
        const shape = options.schema.shape;
        const fieldSchema = shape[field as string];
        if (fieldSchema) {
          fieldSchema.parse(values[field]);
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || 'Invalid value';
        setErrors(prev => ({ ...prev, [field]: errorMessage }));
      }
    }
  }, [options.schema, values]);

  const validate = useCallback(() => {
    try {
      options.schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof FormData;
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [options.schema, values]);

  const handleSubmit = useCallback(
    (onSubmit: (data: FormData) => void | Promise<void>) => {
      return async (e?: React.FormEvent) => {
        if (e) {
          e.preventDefault();
        }

        setIsSubmitting(true);

        if (validate()) {
          try {
            await onSubmit(values as FormData);
          } catch (error) {
            console.error('Form submission error:', error);
          }
        }

        setIsSubmitting(false);
      };
    },
    [validate, values]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setTouched,
    setError,
    clearErrors,
    handleSubmit,
    validate,
  };
};
