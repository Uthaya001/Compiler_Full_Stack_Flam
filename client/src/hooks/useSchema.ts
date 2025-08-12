import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SchemaField {
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'password';
  name: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
}


export interface FormSchema {
  type: 'form';
  title: string;
  fields: SchemaField[];
  submitText: string;
  onSubmit?: string;
}

export interface TextSchema {
  type: 'text';
  title: string;
  content: string;
}

export interface ImageSchema {
  type: 'image';
  title: string;
  src: string;
  alt: string;
  caption?: string;
}

export type Schema = FormSchema | TextSchema | ImageSchema;

interface SchemaState {
  schema: Schema | null;
  jsonError: string | null;
  isValid: boolean;
  lastUpdated: Date;
  setSchema: (schema: Schema | null) => void;
  setJsonError: (error: string | null) => void;
  updateFromJson: (jsonString: string) => void;
  exportSchema: () => void;
  loadTemplate: (template: Schema) => void;
}

export const useSchema = create<SchemaState>()(
  persist(
    (set, get) => ({
      schema: {
        type: 'form',
        title: 'User Registration',
        fields: [
          {
            label: 'Full Name',
            type: 'text',
            name: 'fullName',
            required: true,
            placeholder: 'Enter your full name'
          },
          {
            label: 'Email Address',
            type: 'email',
            name: 'email',
            required: true,
            placeholder: 'your@email.com'
          },
          {
            label: 'Age',
            type: 'number',
            name: 'age',
            min: 18,
            max: 100,
            required: true
          },
          {
            label: 'Bio',
            type: 'textarea',
            name: 'bio',
            placeholder: 'Tell us about yourself...'
          }
        ],
        submitText: 'Create Account',
        onSubmit: "if (values.age < 21) return 'Must be 21 or older'; return 'success';"
      },
      jsonError: null,
      isValid: true,
      lastUpdated: new Date(),
      
      setSchema: (schema) => set({ schema, lastUpdated: new Date() }),
      
      setJsonError: (jsonError) => set({ jsonError, isValid: !jsonError }),
      
      updateFromJson: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          set({ 
            schema: parsed, 
            jsonError: null, 
            isValid: true, 
            lastUpdated: new Date() 
          });
        } catch (error) {
          set({ 
            jsonError: error instanceof Error ? error.message : 'Invalid JSON',
            isValid: false 
          });
        }
      },

      exportSchema: () => {
        const { schema } = get();
        if (!schema) return;

        const dataStr = JSON.stringify(schema, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'schema.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },

      loadTemplate: (template) => {
        set({ 
          schema: template, 
          jsonError: null, 
          isValid: true, 
          lastUpdated: new Date() 
        });
      }
    }),
    {
      name: 'schema-storage',
      partialize: (state) => ({ schema: state.schema })
    }
  )
);
