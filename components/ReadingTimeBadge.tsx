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
    <div className="flex items-center gap-2 text-[10px] opacity-50">
      {showIcon && (
        <span className="flex items-center gap-1">
          <Clock size={11} />
          <span>{minuteText}</span>
        </span>
      )}
      {!showIcon && <span>{minuteText}</span>}
      {showWordCount && words && (
        <span className="flex items-center gap-1">
          <FileText size={11} />
          <span>{words.toLocaleString()} words</span>
        </span>
      )}
    </div>
  );
}
