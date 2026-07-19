import type { MouseEvent } from "react";

import type { MarketplaceItem } from "../../types";
import { useCollection } from "../../context/CollectionContext";
import { formatPrice } from "../../utils/formatters";
import Images from "../common/Images";
import { Badge } from "../common/Badge";

interface ProductCardProps {
    item: MarketplaceItem;
}

const conditionColor: Record<string, string> = {
    Mint: "bg-emerald-100 text-emerald-700",
    NearMint: "bg-teal-100 text-teal-700",
    Excellent: "bg-blue-100 text-blue-700",
    Good: "bg-yellow-100 text-yellow-700",
    Fair: "bg-orange-100 text-orange-700",
    Poor: "bg-red-100 text-red-700",
};

const ProductCard = ({ item }: ProductCardProps) => {
    const { addItem, isInCollection } = useCollection();

    const inCollection = isInCollection(item.id, "Owned");
    const inWishlist = isInCollection(item.id, "Wishlist");

    const addTo =
        (collection: "Owned" | "Wishlist") =>
            (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();

                addItem(
                    {
                        sourceId: item.id,
                        title: item.title,
                        image: item.image,
                        category: item.category,
                        estimatedValue: item.price,
                    },
                    collection
                );
            };

    return (
        <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <Images
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={addTo("Wishlist")}
                    title={inWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                    className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow ${
                        inWishlist
                            ? "bg-amber-400 text-white"
                            : "bg-white text-slate-500"
                    }`}
                >
                    {inWishlist ? "★" : "☆"}
                </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex flex-wrap gap-2">
                    <Badge>{item.category}</Badge>

                    <span
                        className={`rounded-full px-2 py-1 text-xs ${
                            conditionColor[item.condition] ??
                            "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {item.condition}
                    </span>
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold">
                    {item.title}
                </h3>

                <p className="text-xs text-slate-500">
                    📍 {item.location}
                </p>

                <p className="text-xs text-slate-500">
                    👤 {item.sellerName}
                </p>

                <div className="flex-1" />

                <div className="flex items-center justify-between border-t pt-3">
                    <span className="text-lg font-bold text-indigo-600">
                        {formatPrice(item.price)}
                    </span>

                    <button
                        type="button"
                        onClick={addTo("Owned")}
                        className={`rounded-lg px-3 py-2 text-sm ${
                            inCollection
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-indigo-600 text-white"
                        }`}
                    >
                        {inCollection ? "✓ Collected" : "+ Collect"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;