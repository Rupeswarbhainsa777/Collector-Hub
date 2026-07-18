export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
            <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-2/3" />
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
