interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="text-5xl mb-4" aria-hidden="true">
                ⚠️
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Unable to load data</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-5 rounded-lg bg-rose-600 text-white text-sm font-medium px-4 py-2 hover:bg-rose-700 transition-colors"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
