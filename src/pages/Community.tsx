import type { FeedPost } from "../types";
import { CATEGORIES } from "../types/constants";
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

            <div className="sticky top-[57px] md:top-0 z-30 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-6">
                    <div className="w-full sm:flex-1 sm:min-w-[180px]">
                        <SearchBar
                            value={query}
                            onChange={(v) => updateParam("q", v)}
                            placeholder="Search posts..."
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0">
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
                                className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
                            >
                                ✕ Clear
                            </button>
                        )}

                        {status === "success" && (
                            <span className="ml-auto shrink-0 text-xs font-medium text-gray-400">
                                {filteredPosts.length} post
                                {filteredPosts.length !== 1 ? "s" : ""}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
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
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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