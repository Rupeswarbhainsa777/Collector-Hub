export type Category =
    | 'Coins'
    | 'Stamps'
    | 'Trading Cards'
    | 'Comics'
    | 'Vintage Toys'
    | 'Watches'
    | 'Vinyl Records'
    | 'Sports Memorabilia';

export type Condition = 'Mint' | 'Near Mint' | 'Good' | 'Fair' | 'Poor';

export interface MarketplaceItem {
    id: string;
    title: string;
    image: string | null;
    category: Category;
    condition: Condition;
    price: number;
    sellerName: string;
    location: string;
    description: string;
    createdAt: string; // ISO date
}
export interface FeedPost {
    id: string;
    user: {
        name: string;
        avatar: string | null;
    };
    image: string | null;
    caption: string;
    category: Category;
    likes: number;
    comments: number;
    createdAt: string;
    likedByMe?: boolean;
    savedByMe?: boolean;
}
export type CollectionName = 'Owned' | 'Wishlist' | 'Selling';

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'oldest';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';




export interface CollectionItem {
    id: string;
    sourceId: string;
    title: string;
    image: string | null;
    category: Category;
    dateAdded: string;
    estimatedValue: number;
    collection: CollectionName;
}
