import { getPluginConfig } from './registry';

export interface CodeEnhancementsConfig {
  enabled: boolean;
  showFileName: boolean;
  showLineNumbers: boolean;
  enableCopy: boolean;
  highlightLines: boolean;
}

/**
 * Parse meta string for code block enhancements
 * Supports: filename, highlight lines {1-3,7}, and other options
 */
export function parseCodeMeta(meta?: string): {
  fileName?: string;
  highlightLines: number[];
  showLineNumbers: boolean;
} {
  const config = getPluginConfig<CodeEnhancementsConfig>('code-enhancements');
  
  const result = {
    fileName: undefined as string | undefined,
    highlightLines: [] as number[],
    showLineNumbers: config?.showLineNumbers ?? false,
  };

  if (!meta || !config) {
    return result;
  }

  // Extract filename (format: filename="app.ts" or just app.ts if first)
  const fileNameMatch = meta.match(/(?:filename=["']([^"']+)["']|^([\w.-]+\.\w+))/);
  if (fileNameMatch) {
    result.fileName = fileNameMatch[1] || fileNameMatch[2];
  }

  // Extract highlight lines (format: {1-3,7,9-11})
  if (config.highlightLines) {
    const highlightMatch = meta.match(/\{([\d,-]+)\}/);
    if (highlightMatch) {
      const ranges = highlightMatch[1].split(',');
      ranges.forEach(range => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            result.highlightLines.push(i);
          }
        } else {
          result.highlightLines.push(Number(range));
        }
      });
    }
  }

  // Check for explicit line numbers flag
  if (meta.includes('showLineNumbers') || meta.includes('lineNumbers')) {
    result.showLineNumbers = true;
  } else if (meta.includes('noLineNumbers')) {
    result.showLineNumbers = false;
  }

  return result;
}

/**
 * Add line numbers to highlighted HTML
 */
export function addLineNumbers(html: string, highlightLines: number[] = []): string {
  const config = getPluginConfig<CodeEnhancementsConfig>('code-enhancements');
  
  if (!config?.showLineNumbers) {
    return html;
  }

  const lines = html.split('\n');
  const processedLines = lines.map((line, index) => {
    const lineNumber = index + 1;
    const isHighlighted = highlightLines.includes(lineNumber);
    const highlightClass = isHighlighted ? 'bg-yellow-500/10 dark:bg-yellow-500/20' : '';
    
    return `<div class="code-line ${highlightClass}" style="display: flex; padding: 0 1rem;">
      <span class="line-number" style="
        min-width: 2.5rem;
        text-align: right;
        padding-right: 1rem;
        user-select: none;
        opacity: 0.4;
        font-size: 0.75rem;
      ">${lineNumber}</span>
      <span class="line-content" style="flex: 1;">${line}</span>
    </div>`;
  });

  return processedLines.join('\n');
}

/**
 * Check if copy button should be shown
 */
export function shouldShowCopyButton(): boolean {
  const config = getPluginConfig<CodeEnhancementsConfig>('code-enhancements');
  return config?.enableCopy ?? true;
}
