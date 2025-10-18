export default function NotFound() {
    return (
        <div className="min-h-[50vh] flex items-center">
            <div className="w-full">
                <p className="text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
                    404
                </p>
                <h1 className="text-sm mb-3">This page wandered off.</h1>
                <p className="text-xs mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
                    &gt; request not found
                    <span className="inline-block w-2 h-[1em] align-text-bottom ml-[2px] caret-blink" aria-hidden />
                </p>
                <p className="text-[11px] opacity-70" style={{ color: 'var(--color-muted-foreground)' }}>
                    press ⌘K to search
                </p>
            </div>
        </div>
    );
}
