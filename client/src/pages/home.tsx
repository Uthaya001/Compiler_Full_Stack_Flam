import { useState } from "react";
import { SchemaEditor } from "@/components/SchemaEditor";
import { LiveRenderer } from "@/components/LiveRenderer";
import { useSchema } from "@/hooks/useSchema";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { schema, exportSchema } = useSchema();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleExport = () => {
    exportSchema();
  };

  return (
    <div className={`min-h-screen bg-gray-50 font-sans ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-code text-white text-sm"></i>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dynamic Interface Compiler</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Build UI components with JSON schemas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </Button>
            <Button
              onClick={handleExport}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <i className="fas fa-download"></i>
              <span>Export Schema</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Schema Editor Panel */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
          <SchemaEditor />
        </div>

        {/* Live Renderer Panel */}
        <div className="w-1/2">
          <LiveRenderer />
        </div>
      </div>
    </div>
  );
}
