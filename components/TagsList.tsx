import Link from 'next/link';
import { Tag } from 'lucide-react';

interface TagsListProps {
  tags: string[];
  showIcon?: boolean;
}

export function TagsList({ tags, showIcon = true }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xxs">
      {showIcon && <Tag size={14} className="opacity-60" />}
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 rounded-md bg-opacity-10 border border-current opacity-70 hover:opacity-100 transition-opacity"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
