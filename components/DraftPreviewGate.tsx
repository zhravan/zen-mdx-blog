'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface DraftPreviewGateProps {
  isDraft: boolean;
  previewToken: string;
  children: React.ReactNode;
}

export function DraftPreviewGate({ isDraft, previewToken, children }: DraftPreviewGateProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // If not a draft, always show content
    if (!isDraft) {
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    const previewParam = searchParams.get('preview');
    
    // Check if token matches
    if (previewToken && previewParam === previewToken) {
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    // Show modal to enter token
    setIsChecking(false);
    setShowModal(true);
  }, [isDraft, previewToken, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputToken === previewToken) {
      setError('');
      setIsAuthorized(true);
      setShowModal(false);
      // Update URL with token
      const url = new URL(window.location.href);
      url.searchParams.set('preview', inputToken);
      window.history.replaceState({}, '', url.toString());
    } else {
      setAttempts(prev => prev + 1);
      setError('Invalid preview token. Please try again.');
      setInputToken('');
      
      // After 3 failed attempts, show 403 page
      if (attempts >= 2) {
        router.push('/403');
      }
    }
  };

  const handleCancel = () => {
    router.push('/blog');
  };

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="text-sm text-gray-500">Checking access...</p>
        </div>
      </div>
    );
  }

  // Show modal if not authorized
  if (showModal && !isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div 
          className="relative w-full max-w-md mx-4 p-6 rounded-lg shadow-2xl"
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-muted)',
              }}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-center mb-2">
            Draft Content
          </h2>
          
          {/* Description */}
          <p 
            className="text-sm text-center mb-6"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            This post is currently in draft mode. Enter the preview token to access it.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="token" 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Preview Token
              </label>
              <input
                id="token"
                type="password"
                value={inputToken}
                onChange={(e) => {
                  setInputToken(e.target.value);
                  setError('');
                }}
                placeholder="Enter preview token"
                className="w-full px-4 py-2 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: error ? '#ef4444' : 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
                autoFocus
              />
              {error && (
                <p className="text-xs text-red-500 mt-2">
                  {error} {attempts >= 2 && '(Redirecting to access denied page...)'}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 text-sm rounded border hover:opacity-80 transition-opacity"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-muted-foreground)',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm rounded hover:opacity-90 transition-opacity font-medium"
                style={{
                  backgroundColor: 'var(--color-text)',
                  color: 'var(--color-background)',
                }}
              >
                Access Draft
              </button>
            </div>
          </form>

          {/* Attempt counter */}
          {attempts > 0 && (
            <p 
              className="text-xs text-center mt-4"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              Attempts: {attempts}/3
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show content if authorized
  return <>{children}</>;
}
