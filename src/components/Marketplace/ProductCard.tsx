import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import type { MarketplaceItem } from "../../types";
import { useCollection } from "../../context/CollectionContext";
import { formatPrice } from "../../utils/formatters";
import Images from "../common/Images.tsx";
import { Badge } from "../common/Badge.tsx";

interface ProductCardProps {
    item: MarketplaceItem;
    linkState?: Record<string, unknown>;
}

const conditionColor: Record<string, string> = {
    Mint: "bg-emerald-100 text-emerald-700",
    NearMint: "bg-teal-100 text-teal-700",
    Excellent: "bg-blue-100 text-blue-700",
    Good: "bg-yellow-100 text-yellow-700",
    Fair: "bg-orange-100 text-orange-700",
    Poor: "bg-red-100 text-red-700",
};

const ProductCard = ({ item, linkState }: ProductCardProps) => {
    const { addItem, isInCollection } = useCollection();

    const inCollection = isInCollection(item.id, "Owned");
    const inWishlist = isInCollection(item.id, "Wishlist");

    const addTo =
        (collection: "Owned" | "Wishlist") =>
            (e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
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
        <Link
            to={`/marketplace/${item.id}`}
            state={linkState}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >

            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Images
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />


                <button
                    type="button"
                    onClick={addTo("Wishlist")}
                    title={inWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                    className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-base shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 ${
                        inWishlist
                            ? "bg-amber-400 text-white"
                            : "bg-white/80 text-slate-400 hover:text-amber-400"
                    }`}
                >
                    {inWishlist ? "★" : "☆"}
                </button>
            </div>


            <div className="flex flex-1 flex-col gap-2 p-4">
                {/* Category & Condition */}
                <div className="flex flex-wrap items-center gap-1.5">
                    <Badge>{item.category}</Badge>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            conditionColor[item.condition] ?? "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {item.condition}
                    </span>
                </div>


                <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                </h3>


                <p className="text-xs text-slate-500">
                    📍 {item.location}
                </p>
                <p className="text-xs text-slate-500">
                    🧑‍💼 {item.sellerName}
                </p>


                <div className="flex-1" />


                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-base font-bold text-indigo-600">
                        {formatPrice(item.price)}
                    </span>

                    <button
                        type="button"
                        onClick={addTo("Owned")}
                        title={inCollection ? "Already in Collection" : "Add to Collection"}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                            inCollection
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        {inCollection ? "✓ Collected" : "+ Collect"}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;