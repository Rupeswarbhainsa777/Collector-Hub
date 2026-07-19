export function SkeletonCard() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
                    <div className="h-2.5 w-16 rounded bg-gray-200 animate-pulse" />
                </div>
            </div>

            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />

            <div className="px-4 py-3 space-y-3">
                <div className="h-4 w-20 rounded-full bg-gray-200 animate-pulse" />

                <div className="space-y-1.5">
                    <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-3.5 w-4/5 rounded bg-gray-200 animate-pulse" />
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex gap-2">
                        <div className="h-7 w-14 rounded-lg bg-gray-200 animate-pulse" />
                        <div className="h-7 w-14 rounded-lg bg-gray-200 animate-pulse" />
                    </div>

                    <div className="h-7 w-9 rounded-lg bg-gray-200 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}