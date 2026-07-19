import type { CollectionName} from "../types";
import { CATEGORIES } from "../types/constants";
import {useCollection} from "../context/CollectionContext.tsx";
import {Link, useSearchParams} from "react-router-dom";
import CollectionItemCard from "../components/collection/CollectionItemCard.tsx";
import {EmptyState} from "../components/common/EmptyState.tsx";
import {Select} from "../components/common/Select.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import {useMemo} from "react";


const TABS: CollectionName[] = ['Owned', 'Wishlist', 'Selling'];
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


    const tabMeta: Record<CollectionName, { icon: string; color: string }> = {
        Owned:    { icon: '📦', color: 'text-indigo-600' },
        Wishlist: { icon: '⭐', color: 'text-amber-500' },
        Selling:  { icon: '🏷️', color: 'text-emerald-600' },
    };

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 sm:py-6 gap-3">
                        <div>
                            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">My Collection</h1>
                            <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                Track what you own, want, and are selling.
                            </p>
                        </div>

                        {tabItems.length === 0 && (
                            <Link
                                to="/marketplace"
                                className="shrink-0 rounded-full bg-gray-900 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.97]"
                            >
                                Browse Marketplace →
                            </Link>
                        )}
                    </div>
                </div>
            </div>


            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {TABS.map((t) => {
                            const count = items.filter((i) => i.collection === t).length;
                            const isActive = tab === t;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={[
                                        "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3.5 text-sm font-medium transition-colors duration-150",
                                        isActive
                                            ? "border-gray-900 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    ].join(" ")}
                                >
                                    <span>{tabMeta[t].icon}</span>
                                    {t}
                                    <span
                                        className={[
                                            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                                            isActive
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-500",
                                        ].join(" ")}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:flex-wrap sm:items-center">

                        <div className="w-full sm:flex-1 sm:min-w-[180px] sm:max-w-xs">
                            <SearchBar
                                value={query}
                                onChange={(v) => updateParam("q", v)}
                                placeholder={`Search ${tab.toLowerCase()}...`}
                            />
                        </div>


                        <div className="hidden h-5 w-px bg-gray-200 sm:block" />


                        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0 sm:flex-wrap">
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

                            {hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        const next = new URLSearchParams();
                                        next.set("tab", tab);
                                        setParams(next, { replace: true });
                                    }}
                                    className="shrink-0 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Clear
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">✕</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {tabItems.length === 0 ? (
                    <EmptyState
                        icon={tabMeta[tab].icon}
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

                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{filteredItems.length}</span>{" "}
                                {filteredItems.length === 1 ? "item" : "items"}
                            </p>
                        </div>


                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                            {filteredItems.map((item) => (
                                <CollectionItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
export default MyCollection;