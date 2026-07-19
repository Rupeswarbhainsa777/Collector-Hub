import type { Category, FeedPost } from "../types";
import { useSearchParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync.ts";
import { fetchFeedPosts } from "../api/mockapis.ts";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.ts";
import PostCard from "../components/feed/PostCard.tsx";
import { EmptyState } from "../components/common/EmptyState.tsx";
import { ErrorState } from "../components/common/ErrorState.tsx";
import { SkeletonGrid } from "../components/common/SkeletonGrid.tsx";
import { Select } from "../components/common/Select.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import PostDetailModal from "../components/feed/PostDetailModal.tsx";

const CATEGORIES: Category[] = [
    "Coins",
    "Stamps",
    "Trading Cards",
    "Comics",
    "Vintage Toys",
    "Watches",
    "Vinyl Records",
    "Sports Memorabilia",
];

const CommunityPages = () => {
    const [params, setParams] = useSearchParams();
    const { data: posts, status, error, reload } = useAsync(fetchFeedPosts, []);
    const [activePost, setActivePost] = useState<FeedPost | null>(null);

    const query = params.get("q") ?? "";
    const category = params.get("category") ?? "All";
    const debouncedQuery = useDebounce(query, 300);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (!value || value === "All") next.delete(key);
        else next.set(key, value);
        setParams(next, { replace: true });
    };

    const filteredPosts = useMemo(() => {
        if (!posts) return [];

        return posts.filter((post) => {
            const matchesQuery = post.caption
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase().trim());

            const matchesCategory =
                category === "All" || post.category === category;

            return matchesQuery && matchesCategory;
        });
    }, [posts, debouncedQuery, category]);

    const hasActiveFilters = query || category !== "All";

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-14 text-center shadow-lg">
                <div className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-2xl">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                        🌟 Collector Community
                    </span>

                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Community Feed
                    </h1>

                    <p className="mt-3 text-lg font-medium text-indigo-100">
                        See what fellow collectors are sharing &amp; discover rare
                        finds.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {[
                            { label: "Active Members", value: "12.4K" },
                            { label: "Posts This Week", value: "3.2K" },
                            { label: "Categories", value: "8" },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center rounded-2xl bg-white/15 px-5 py-2.5 backdrop-blur-sm"
                            >
                                <span className="text-xl font-bold text-white">
                                    {value}
                                </span>
                                <span className="text-xs font-medium text-indigo-100">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky top-16 z-30 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
                    <div className="flex-1 min-w-[180px]">
                        <SearchBar
                            value={query}
                            onChange={(v) => updateParam("q", v)}
                            placeholder="Search posts..."
                        />
                    </div>

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

                    {hasActiveFilters && (
                        <button
                            onClick={() =>
                                setParams(new URLSearchParams(), {
                                    replace: true,
                                })
                            }
                            className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
                        >
                            ✕ Clear filters
                        </button>
                    )}

                    {status === "success" && (
                        <span className="ml-auto text-xs font-medium text-gray-400">
                            {filteredPosts.length} post
                            {filteredPosts.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                {status === "loading" && <SkeletonGrid count={9} />}

                {status === "error" && (
                    <ErrorState
                        message={error ?? undefined}
                        onRetry={reload}
                    />
                )}

                {status === "success" && filteredPosts.length === 0 && (
                    <EmptyState
                        icon="💬"
                        title={
                            hasActiveFilters
                                ? "No posts match your search"
                                : "No posts yet"
                        }
                        description={
                            hasActiveFilters
                                ? "Try a different search term or category."
                                : "Be the first to share something with the community."
                        }
                        action={
                            hasActiveFilters
                                ? {
                                    label: "Clear filters",
                                    onClick: () =>
                                        setParams(new URLSearchParams(), {
                                            replace: true,
                                        }),
                                }
                                : undefined
                        }
                    />
                )}

                {status === "success" && filteredPosts.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onOpen={setActivePost}
                            />
                        ))}
                    </div>
                )}
            </div>

            {activePost && (
                <PostDetailModal
                    post={activePost}
                    onClose={() => setActivePost(null)}
                />
            )}
        </div>
    );
};

export default CommunityPages;