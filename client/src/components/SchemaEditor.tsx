import { useEffect, useState } from 'react';
import { useSchema } from '@/hooks/useSchema';
import { Button } from '@/components/ui/button';
import { getTemplates } from '@/utils/templates';

export function SchemaEditor() {
  const { schema, jsonError, isValid, updateFromJson, loadTemplate } = useSchema();
  const [jsonValue, setJsonValue] = useState('');
  const templates = getTemplates();

  useEffect(() => {
    if (schema) {
      setJsonValue(JSON.stringify(schema, null, 2));
    }
  }, [schema]);

  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    updateFromJson(value);
  };

  const handleTemplateClick = (templateKey: string) => {
    const template = templates[templateKey];
    if (template) {
      loadTemplate(template);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <i className="fas fa-edit text-blue-500"></i>
            <span>Schema Editor</span>
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm">
              <div className={`w-2 h-2 ${isValid ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
              <span className={isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {isValid ? 'Valid JSON' : 'Invalid JSON'}
              </span>
            </div>
          </div>
        </div>
        {jsonError && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            Error: {jsonError}
          </div>
        )}
      </div>
      
      {/* Monaco Editor Container */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#1e1e1e] text-white font-mono text-sm">
          <textarea
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-full p-4 bg-[#1e1e1e] text-white font-mono text-sm resize-none border-none outline-none"
            style={{
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              lineHeight: '1.4',
              tabSize: 2
            }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Schema Templates */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Templates</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateClick('form')}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors border-blue-200 dark:border-blue-700"
          >
            Form
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateClick('text')}
            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs hover:bg-green-200 dark:hover:bg-green-800 transition-colors border-green-200 dark:border-green-700"
          >
            Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateClick('image')}
            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors border-purple-200 dark:border-purple-700"
          >
            Image
          </Button>
        </div>
      </div>
    </div>
  );
}
