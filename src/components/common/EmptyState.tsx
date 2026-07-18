interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon = '📦', title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="text-5xl mb-4" aria-hidden="true">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            {description && <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>}
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-5 rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-700 transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
