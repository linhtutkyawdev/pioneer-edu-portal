'use client';

import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { useRef, useState } from 'react';

const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="text-white" htmlFor="tags">
        Add Tag ({tags.join(', ')})
        <input
          type="hidden"
          name="tags"
          id="tags"
          value={tags.length > 0 ? tags.join(', ') : ''}
        />
      </label>
      <div className="flex gap-2">
        <input
          ref={ref}
          type="text"
          placeholder="HTML"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
        />
        <Button
          type="button"
          onClick={() =>
            ref.current?.value && setTags([...tags, ref.current?.value])
          }
          variant="secondary"
          className="mt-2"
        >
          Add
        </Button>
        <Button
          type="button"
          onClick={() => tags.length > 0 && setTags(tags.slice(0, -1))}
          variant="destructive"
          size="icon"
          className="mt-2 pl-2 pr-3"
        >
          <Delete />
        </Button>
      </div>
    </div>
  );
};

export default Tags;
