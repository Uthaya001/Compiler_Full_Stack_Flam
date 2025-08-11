import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormSchema } from '@/hooks/useSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { executeCustomLogic } from '@/utils/sandboxExecutor';
import { Card, CardContent } from '@/components/ui/card';

interface FormBlockProps {
  schema: FormSchema;
}

export function FormBlock({ schema }: FormBlockProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submissionResult, setSubmissionResult] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const onSubmit = (data: any) => {
    console.log('Form submitted with data:', data);

    if (schema.onSubmit) {
      try {
        const result = executeCustomLogic(schema.onSubmit, data);
        if (result === 'success') {
          setSubmissionResult({
            type: 'success',
            message: 'Form submitted successfully!'
          });
        } else {
          setSubmissionResult({
            type: 'error',
            message: result
          });
        }
      } catch (error) {
        setSubmissionResult({
          type: 'error',
          message: `Error executing custom logic: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    } else {
      setSubmissionResult({
        type: 'success',
        message: 'Form submitted successfully!'
      });
    }
  };

  const renderField = (field: any, index: number) => {
    const fieldProps = {
      ...register(field.name, {
        required: field.required ? `${field.label} is required` : false,
        min: field.min ? { value: field.min, message: `Minimum value is ${field.min}` } : undefined,
        max: field.max ? { value: field.max, message: `Maximum value is ${field.max}` } : undefined,
        pattern: field.type === 'email' ? {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        } : undefined
      })
    };

    return (
      <div key={index} className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.type === 'textarea' ? (
          <Textarea
            {...fieldProps}
            placeholder={field.placeholder}
            className="w-full"
            rows={3}
          />
        ) : (
          <Input
            {...fieldProps}
            type={field.type}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className="w-full"
          />
        )}
        {errors[field.name] && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors[field.name]?.message as string}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {schema.title}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {schema.fields.map((field, index) => renderField(field, index))}

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {schema.submitText}
            </Button>

            {submissionResult.type === 'error' && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {submissionResult.message}
              </div>
            )}

            {submissionResult.type === 'success' && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-400">
                <i className="fas fa-check-circle mr-2"></i>
                {submissionResult.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
