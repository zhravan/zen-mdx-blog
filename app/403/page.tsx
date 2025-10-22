import Link from 'next/link';

export const metadata = {
  title: '403',
  description: 'Access denied',
};

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* Minimalist Error Display */}
      <div className="max-w-sm w-full space-y-8">
        
        {/* Artistic 403 */}
        <div className="relative">
          <div className="text-[10rem] font-bold leading-none tracking-tighter opacity-5 select-none">
            403
          </div>
          <div 
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-2">
              <div className="text-sm font-medium tracking-wide uppercase opacity-60">
                Access Denied
              </div>
              <div 
                className="h-px w-12 mx-auto"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            </div>
          </div>
        </div>

        {/* Minimal Message */}
        <div className="text-center space-y-4">
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            This draft requires a preview token.
          </p>
          
          {/* Simple Navigation */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <Link
              href="/blog"
              className="text-sm hover:opacity-60 transition-opacity underline underline-offset-4"
            >
              ← Blog
            </Link>
            <Link
              href="/"
              className="text-sm hover:opacity-60 transition-opacity underline underline-offset-4"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
