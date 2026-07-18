import type {CollectionItem, CollectionName} from "../../types";
import {useCollection} from "../../context/CollectionContext.tsx";
import Images from "../common/Images.tsx";
import {formatDate, formatPrice} from "../../utils/formatters.ts";
import {Badge} from "../common/Badge.tsx";


const ALL_COLLECTIONS: CollectionName[] = ['Owned', 'Wishlist', 'Selling'];

interface CollectionItemCardProps {
    item: CollectionItem;
}

const collectionIcon: Record<CollectionName, string> = {
    Owned:    '📦',
    Wishlist: '⭐',
    Selling:  '🏷️',
};

const CollectionItemCard = ({ item }: CollectionItemCardProps) => {
    const { removeItem, moveItem } = useCollection();
    const otherCollections = ALL_COLLECTIONS.filter((c) => c !== item.collection);

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* ── Image ──────────────────────────────────────────────────── */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Images
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Collection badge overlay */}
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                    {collectionIcon[item.collection]} {item.collection}
                </span>
            </div>

            {/* ── Body ───────────────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col gap-2 p-4">

                {/* Category + Date */}
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <Badge>{item.category}</Badge>
                    <span className="text-xs text-slate-400">{formatDate(item.dateAdded)}</span>
                </div>

                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                </h3>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Value + Actions */}
                <div className="border-t border-slate-100 pt-3">
                    <p className="mb-2.5 text-xs text-slate-500">
                        Est. value:{" "}
                        <span className="font-bold text-indigo-600 text-sm">
                            {formatPrice(item.estimatedValue)}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">
                        {/* Move select */}
                        <select
                            aria-label={`Move ${item.title}`}
                            value=""
                            onChange={(e) => {
                                if (e.target.value) moveItem(item.id, e.target.value as CollectionName);
                                e.target.value = '';
                            }}
                            className="flex-1 h-8 rounded-lg border border-gray-200 bg-white px-2 py-0 text-xs text-gray-700 shadow-xs focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-colors hover:border-gray-300 cursor-pointer"
                        >
                            <option value="" disabled>Move to…</option>
                            {otherCollections.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        {/* Remove button */}
                        <button
                            onClick={() => removeItem(item.id)}
                            title="Remove from collection"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 text-xs transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CollectionItemCard;