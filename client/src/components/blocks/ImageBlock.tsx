import { ImageSchema } from '@/hooks/useSchema';
import { Card, CardContent } from '@/components/ui/card';

interface ImageBlockProps {
  schema: ImageSchema;
}

export function ImageBlock({ schema }: ImageBlockProps) {
  return (
    <div className="max-w-xl mx-auto">
      <Card className="shadow-lg overflow-hidden">
        <img
          src={schema.src}
          alt={schema.alt}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500';
          }}
        />
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {schema.title}
          </h3>
          {schema.caption && (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {schema.caption}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
