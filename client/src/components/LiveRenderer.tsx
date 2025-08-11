import { useEffect, useState } from 'react';
import { useSchema } from '@/hooks/useSchema';
import { FormBlock } from '@/components/blocks/FormBlock';
import { TextBlock } from '@/components/blocks/TextBlock';
import { ImageBlock } from '@/components/blocks/ImageBlock';

export function LiveRenderer() {
  const { schema, lastUpdated } = useSchema();
  const [timeAgo, setTimeAgo] = useState('just now');

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      if (seconds < 60) {
        setTimeAgo(seconds === 0 ? 'just now' : `${seconds}s ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const renderComponent = () => {
    if (!schema) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No schema provided
        </div>
      );
    }

    switch (schema.type) {
      case 'form':
        return <FormBlock schema={schema} />;
      case 'text':
        return <TextBlock schema={schema} />;
      case 'image':
        return <ImageBlock schema={schema} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-red-500">
            Unsupported component type: {(schema as any).type}
          </div>
        );
    }
  };

  const getComponentTypeName = () => {
    if (!schema) return 'None';
    switch (schema.type) {
      case 'form':
        return 'FormBlock';
      case 'text':
        return 'TextBlock';
      case 'image':
        return 'ImageBlock';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
          <i className="fas fa-eye text-green-500"></i>
          <span>Live Preview</span>
        </h2>
      </div>

      {/* Rendered Component Container */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        {renderComponent()}
      </div>

      {/* Renderer Status */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Rendered: {getComponentTypeName()}</span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">Last updated: {timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
