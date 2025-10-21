import { Clock, FileText } from 'lucide-react';

interface ReadingTimeBadgeProps {
  minutes: number;
  words?: number;
  showIcon?: boolean;
  showWordCount?: boolean;
}

export function ReadingTimeBadge({ 
  minutes, 
  words,
  showIcon = true,
  showWordCount = true
}: ReadingTimeBadgeProps) {
  const minuteText = minutes === 1 ? '1 min read' : `${minutes} min read`;
  const wordText = showWordCount && words ? ` · ${words.toLocaleString()} words` : '';

  return (
    <div className="flex items-center gap-3 text-xxs opacity-70">
      {showIcon && (
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>{minuteText}</span>
        </span>
      )}
      {!showIcon && <span>{minuteText}</span>}
      {showWordCount && words && (
        <span className="flex items-center gap-1.5">
          <FileText size={14} />
          <span>{words.toLocaleString()} words</span>
        </span>
      )}
    </div>
  );
}
