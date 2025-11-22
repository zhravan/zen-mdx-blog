'use client';

import { useState } from 'react';
import { FileText, Download, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

interface DocumentViewerProps {
  src: string;
  title?: string;
  type?: 'pdf' | 'ppt' | 'pptx' | 'auto';
  height?: string;
  allowDownload?: boolean;
  allowFullscreen?: boolean;
}

export function DocumentViewer({
  src,
  title,
  type = 'auto',
  height = '600px',
  allowDownload = true,
  allowFullscreen = true,
}: DocumentViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);

  // Detect file type from extension if auto
  const fileType = type === 'auto' 
    ? src.split('.').pop()?.toLowerCase() || 'pdf'
    : type;

  const isPDF = fileType === 'pdf';
  const isPPT = fileType === 'ppt' || fileType === 'pptx';

  // Use different viewers based on file type
  const getViewerUrl = () => {
    if (isPDF) {
      // For PDFs, use browser's native viewer or PDF.js
      return src;
    }
    if (isPPT) {
      // For PPT/PPTX, use Microsoft Office Online viewer
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;
    }
    return src;
  };

  const viewerUrl = getViewerUrl();

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (error) {
    return (
      <div className="my-8 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-6">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
              Failed to load document
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              The document viewer couldn't load the file. You can try downloading it instead.
            </p>
            {allowDownload && (
              <a
                href={src}
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                <Download className="h-4 w-4" />
                Download {fileType.toUpperCase()}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 ${isFullscreen ? 'fixed inset-0 z-50 bg-black/95 p-4' : ''}`}>
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {title || `Document Preview (${fileType.toUpperCase()})`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {allowDownload && (
              <a
                href={src}
                download
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </a>
            )}
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </a>
            {allowFullscreen && (
              <button
                onClick={handleFullscreen}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Viewer */}
        <div 
          className="relative bg-gray-100 dark:bg-gray-900"
          style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}
        >
          {isPDF ? (
            <object
              data={viewerUrl}
              type="application/pdf"
              className="w-full h-full"
              onError={() => setError(true)}
            >
              <iframe
                src={viewerUrl}
                className="w-full h-full"
                title={title || 'Document viewer'}
                onError={() => setError(true)}
              />
            </object>
          ) : (
            <iframe
              src={viewerUrl}
              className="w-full h-full"
              title={title || 'Document viewer'}
              onError={() => setError(true)}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isPPT && 'Powered by Microsoft Office Online Viewer • '}
            {isPDF && 'Using browser PDF viewer • '}
            <a 
              href={src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 dark:hover:text-gray-200"
            >
              View original
            </a>
          </p>
        </div>
      </div>

      {/* Fullscreen close button */}
      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors"
          title="Exit fullscreen"
        >
          <Minimize2 className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
}

// Simplified component for quick embedding
export function PDF({ src, title, height }: { src: string; title?: string; height?: string }) {
  return <DocumentViewer src={src} title={title} type="pdf" height={height} />;
}

export function PPT({ src, title, height }: { src: string; title?: string; height?: string }) {
  return <DocumentViewer src={src} title={title} type="pptx" height={height} />;
}
