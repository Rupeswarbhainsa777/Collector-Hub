import type {FeedPost, MarketplaceItem} from "../types";
import  marketplaceData from '../data/marketplace.json'
import feedData from '../data/feed.json'
const DELAY_MS = 600;
const FAILURE_RATE = 0;

function delay<T>(value: T, ms = DELAY_MS): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error('Network request failed. Please try again.'));
            } else {
                resolve(value);
            }
        }, ms);
    });
}

export async function fetchMarketplaceItems(): Promise<MarketplaceItem[]> {
    return delay(marketplaceData as MarketplaceItem[]);
}

export async function fetchMarketplaceItemById(id: string): Promise<MarketplaceItem | undefined> {
    const items = marketplaceData as MarketplaceItem[];
    return delay(items.find((item) => item.id === id));
}

export async function fetchFeedPosts(): Promise<FeedPost[]> {
    return delay(feedData as FeedPost[]);
}
