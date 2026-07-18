import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useMemo } from "react";
import { fetchMarketplaceItems } from "../api/mockapis.ts";
import ProductCard from "../components/Marketplace/ProductCard.tsx";
import {useAsync} from "../hooks/useAsync.ts";
import SearchBar from "../components/common/SearchBar.tsx";
import {EmptyState} from "../components/common/EmptyState.tsx";
import {ErrorState} from "../components/common/ErrorState.tsx";
import {Select} from "../components/common/Select.tsx";
import type {Category, Condition} from "../types";
import {SkeletonGrid} from "../components/common/SkeletonGrid.tsx";

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
        <div>
            <div>
                <h1>Marketplace</h1>
                <p>Browse collectibles from sellers around the world.</p>
            </div>

            <div>
                <div>
                    <SearchBar
                        value={query}
                        onChange={(v) => updateParam("q", v)}
                        placeholder="Search by title..."
                    />
                </div>

                <div>
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
            </div>

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
                    action={
                        hasActiveFilters
                            ? {
                                label: "Clear filters",
                                onClick: () =>
                                    setParams(new URLSearchParams(), { replace: true }),
                            }
                            : undefined
                    }
                />
            )}

            {status === "success" && filteredItems.length > 0 && (
                <>
                    <p>
                        {filteredItems.length}{" "}
                        {filteredItems.length === 1 ? "item" : "items"} found
                    </p>

                    <div>
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
        </div>
    );
}
export default MarketplacePage;