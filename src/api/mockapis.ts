import type { FeedPost, MarketplaceItem } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return await res.json() as Promise<T>;
}

export async function fetchMarketplaceItems(): Promise<MarketplaceItem[]> {
    return apiFetch<MarketplaceItem[]>('/data/marketplace.json');
}

export async function fetchMarketplaceItemById(id: string): Promise<MarketplaceItem | undefined> {
    const items = await fetchMarketplaceItems();
    return items.find((item) => item.id === id);
}

export async function fetchFeedPosts(): Promise<FeedPost[]> {
    return apiFetch<FeedPost[]>('/data/feed.json');
}
