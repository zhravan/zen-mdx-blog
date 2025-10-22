import { isDraft } from '@/lib/plugins/drafts';

interface DraftBadgeProps {
  draft?: boolean;
}

export function DraftBadge({ draft }: DraftBadgeProps) {
  if (!draft) {
    return null;
  }

  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded"
      style={{
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        color: 'rgb(255, 193, 7)',
        border: '1px solid rgba(255, 193, 7, 0.2)',
      }}
    >
      Draft
    </span>
  );
}
