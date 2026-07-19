import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useMemo } from "react";
import { fetchMarketplaceItems } from "../api/mockapis.ts";
import ProductCard from "../components/Marketplace/ProductCard.tsx";
import { useAsync } from "../hooks/useAsync.ts";
import SearchBar from "../components/common/SearchBar.tsx";
import { EmptyState } from "../components/common/EmptyState.tsx";
import { ErrorState } from "../components/common/ErrorState.tsx";
import { Select } from "../components/common/Select.tsx";
import type { Category, Condition } from "../types";
import { SkeletonGrid } from "../components/common/SkeletonGrid.tsx";

const CONDITIONS: Condition[] = ['Mint', 'Near Mint', 'Good', 'Fair', 'Poor'];
const CATEGORIES: Category[] = [
    'Coins',
    'Stamps',
    'Trading Cards',
    'Comics',
    'Vintage Toys',
    'Watches',
    'Vinyl Records',
    'Sports Memorabilia',
];
const MarketplacePage = () => {
    const [params, setParams] = useSearchParams();
    const { data: items, status, error, reload } = useAsync(fetchMarketplaceItems, []);

    const query = params.get('q') ?? '';
    const category = params.get('category') ?? 'All';
    const condition = params.get('condition') ?? 'All';
    const sort = params.get('sort') ?? 'newest';

    const debouncedQuery = useDebounce(query, 300);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (!value || value === 'All') {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        setParams(next, { replace: true });
    };

    const filteredItems = useMemo(() => {
        if (!items) {
            return [];
        }

        let result = items.filter((item) => {
            const matchesQuery = item.title
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase().trim());

            const matchesCategory =
                category === "All" || item.category === category;

            const matchesCondition =
                condition === "All" || item.condition === condition;

            return matchesQuery && matchesCategory && matchesCondition;
        });

        result = [...result].sort((a, b) => {
            if (sort === "price-asc") {
                return a.price - b.price;
            } else if (sort === "price-desc") {
                return b.price - a.price;
            } else if (sort === "oldest") {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            } else {
                // newest (default)
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            }
        });

        return result;
    }, [items, debouncedQuery, category, condition, sort]);

    const hasActiveFilters = query || category !== 'All' || condition !== 'All';

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Marketplace
                            </h1>
                            <p className="mt-0.5 text-sm text-gray-500">
                                Browse collectibles from sellers around the world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2 py-3">
                        {/* Search */}
                        <div className="flex-1 min-w-[180px] max-w-xs">
                            <SearchBar
                                value={query}
                                onChange={(v) => updateParam("q", v)}
                                placeholder="Search by title..."
                            />
                        </div>


                        <div className="hidden h-5 w-px bg-gray-200 sm:block" />

                        <div className="flex flex-wrap items-center gap-2">
                            <Select
                                label="Category"
                                value={category}
                                onChange={(v) => updateParam("category", v)}
                                options={[
                                    { label: "All Categories", value: "All" },
                                    ...CATEGORIES.map((c) => ({ label: c, value: c })),
                                ]}
                            />
                            <Select
                                label="Condition"
                                value={condition}
                                onChange={(v) => updateParam("condition", v)}
                                options={[
                                    { label: "All Conditions", value: "All" },
                                    ...CONDITIONS.map((c) => ({ label: c, value: c })),
                                ]}
                            />
                            <Select
                                label="Sort by"
                                value={sort}
                                onChange={(v) => updateParam("sort", v)}
                                options={[
                                    { label: "Newest", value: "newest" },
                                    { label: "Oldest", value: "oldest" },
                                    { label: "Price: Low to High", value: "price-asc" },
                                    { label: "Price: High to Low", value: "price-desc" },
                                ]}
                            />
                        </div>


                        {hasActiveFilters && (
                            <button
                                onClick={() => setParams(new URLSearchParams(), { replace: true })}
                                className="ml-auto flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Clear filters
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">✕</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>


            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {status === "loading" && <SkeletonGrid count={8} />}

                {status === "error" && (
                    <ErrorState message={error ?? undefined} onRetry={reload} />
                )}

                {status === "success" && filteredItems.length === 0 && (
                    <EmptyState
                        icon="🔎"
                        title={
                            hasActiveFilters
                                ? "No items match your search"
                                : "No listings yet"
                        }
                        description={
                            hasActiveFilters
                                ? "Try adjusting your search or filters to find what you're looking for."
                                : "Check back soon — new collectibles are added regularly."
                        }
                    />
                )}

                {status === "success" && filteredItems.length > 0 && (
                    <>

                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{filteredItems.length}</span>{" "}
                                {filteredItems.length === 1 ? "result" : "results"}
                            </p>
                        </div>


                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredItems.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    linkState={{
                                        from: `${window.location.pathname}${window.location.search}`,
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
export default MarketplacePage;