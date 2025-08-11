import { TextSchema } from '@/hooks/useSchema';
import { Card, CardContent } from '@/components/ui/card';

interface TextBlockProps {
  schema: TextSchema;
}

export function TextBlock({ schema }: TextBlockProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {schema.title}
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div
              className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: schema.content }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
