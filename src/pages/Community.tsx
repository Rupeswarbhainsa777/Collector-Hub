import type {Category, FeedPost} from "../types";
import {useSearchParams} from "react-router-dom";
import {useAsync} from "../hooks/useAsync.ts";
import {fetchFeedPosts} from "../api/mockapis.ts";
import {useMemo, useState} from "react";
import {useDebounce} from "../hooks/useDebounce.ts";
import PostCard from "../components/feed/PostCard.tsx";
import {EmptyState} from "../components/common/EmptyState.tsx";
import {ErrorState} from "../components/common/ErrorState.tsx";
import {SkeletonGrid} from "../components/common/SkeletonGrid.tsx";
import {Select} from "../components/common/Select.tsx";
import SearchBar from "../components/common/SearchBar.tsx";

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

const CommunityPages = () => {
    const [params, setParams] = useSearchParams();
    const { data: posts, status, error, reload } = useAsync(fetchFeedPosts, []);
    const [activePost, setActivePost] = useState<FeedPost | null>(null);

    const query = params.get('q') ?? '';
    const category = params.get('category') ?? 'All';
    const debouncedQuery = useDebounce(query, 300);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (!value || value === 'All') next.delete(key);
        else next.set(key, value);
        setParams(next, { replace: true });
    };

    const filteredPosts = useMemo(() => {
        if (!posts) return [];
        return posts.filter((post) => {
            const matchesQuery = post.caption.toLowerCase().includes(debouncedQuery.toLowerCase().trim());
            const matchesCategory = category === 'All' || post.category === category;
            return matchesQuery && matchesCategory;
        });
    }, [posts, debouncedQuery, category]);

    const hasActiveFilters = query || category !== 'All';
    return (
        <div>
            <div>
                <h1>Community Feed</h1>
                <p>See what fellow collectors are sharing.</p>
            </div>

            <div>
                <div>
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
            </div>

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
                <div>
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onOpen={setActivePost}
                        />
                    ))}
                </div>
            )}

            {activePost && (
                <PostDetailModal
                    post={activePost}
                    onClose={() => setActivePost(null)}
                />
            )}
        </div>
    );
}
export default CommunityPages;