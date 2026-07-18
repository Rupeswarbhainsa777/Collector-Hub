import type {Category, CollectionName} from "../types";
import {useCollection} from "../context/CollectionContext.tsx";
import {Link, useSearchParams} from "react-router-dom";
import CollectionItemCard from "../components/collection/CollectionItemCard.tsx";
import {EmptyState} from "../components/common/EmptyState.tsx";
import {Select} from "../components/common/Select.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import {useMemo} from "react";


const TABS: CollectionName[] = ['Owned', 'Wishlist', 'Selling'];

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
const MyCollection = () =>{

    const { items } = useCollection();
    const [params, setParams] = useSearchParams();

    const tab = (params.get('tab') as CollectionName) || 'Owned';
    const query = params.get('q') ?? '';
    const category = params.get('category') ?? 'All';
    const sort = params.get('sort') ?? 'newest';

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (!value || value === 'All') next.delete(key);
        else next.set(key, value);
        setParams(next, { replace: true });
    };

    const setTab = (t: CollectionName) => {
        const next = new URLSearchParams(params);
        next.set('tab', t);
        setParams(next, { replace: true });
    };

    const tabItems = useMemo(() => items.filter((item) => item.collection === tab), [items, tab]);

    const filteredItems = useMemo(() => {
        let result = tabItems.filter((item) => {
            const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase().trim());
            const matchesCategory = category === 'All' || item.category === category;
            return matchesQuery && matchesCategory;
        });

        result = [...result].sort((a, b) => {
            switch (sort) {
                case 'value-asc':
                    return a.estimatedValue - b.estimatedValue;
                case 'value-desc':
                    return b.estimatedValue - a.estimatedValue;
                case 'oldest':
                    return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
                case 'newest':
                default:
                    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            }
        });

        return result;
    }, [tabItems, query, category, sort]);

    const hasActiveFilters = query || category !== 'All';


    return (
        <div>
            <div>
                <h1>My Collection</h1>
                <p>Track what you own, want, and are selling.</p>
            </div>

            <div>
                {TABS.map((t) => {
                    const count = items.filter((i) => i.collection === t).length;

                    return (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                        >
                            {t} <span>({count})</span>
                        </button>
                    );
                })}
            </div>

            <div>
                <div>
                    <SearchBar
                        value={query}
                        onChange={(v) => updateParam("q", v)}
                        placeholder={`Search ${tab.toLowerCase()}...`}
                    />
                </div>

                <div>
                    <Select
                        label="Category"
                        value={category}
                        onChange={(v) => updateParam("category", v)}
                        options={[
                            { label: "All Categories", value: "All" },
                            ...CATEGORIES.map((c) => ({
                                label: c,
                                value: c,
                            })),
                        ]}
                    />

                    <Select
                        label="Sort by"
                        value={sort}
                        onChange={(v) => updateParam("sort", v)}
                        options={[
                            { label: "Newest Added", value: "newest" },
                            { label: "Oldest Added", value: "oldest" },
                            { label: "Value: Low to High", value: "value-asc" },
                            { label: "Value: High to Low", value: "value-desc" },
                        ]}
                    />
                </div>
            </div>

            {tabItems.length === 0 ? (
                <EmptyState
                    icon={tab === "Owned" ? "📦" : tab === "Wishlist" ? "⭐" : "🏷️"}
                    title={`Your ${tab} list is empty`}
                    description={
                        tab === "Selling"
                            ? "Move items here once you decide to sell them."
                            : "Browse the Marketplace to start adding collectibles."
                    }
                />
            ) : filteredItems.length === 0 ? (
                <EmptyState
                    icon="🔎"
                    title="No items match your search"
                    description="Try adjusting your search or filters."
                    action={
                        hasActiveFilters
                            ? {
                                label: "Clear filters",
                                onClick: () => {
                                    const next = new URLSearchParams();
                                    next.set("tab", tab);
                                    setParams(next, { replace: true });
                                },
                            }
                            : undefined
                    }
                />
            ) : (
                <>
                    <p>
                        {filteredItems.length}{" "}
                        {filteredItems.length === 1 ? "item" : "items"}
                    </p>

                    <div>
                        {filteredItems.map((item) => (
                            <CollectionItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </>
            )}

            {tabItems.length === 0 && (
                <div>
                    <Link to="/marketplace">
                        Go to Marketplace →
                    </Link>
                </div>
            )}
        </div>
    );
}
export default MyCollection;