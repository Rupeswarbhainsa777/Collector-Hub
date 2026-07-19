import { useEffect } from "react";
import type { MarketplaceItem } from "../../types";
import Images from "../common/Images.tsx";
import { useCollection } from "../../context/CollectionContext.tsx";
import { formatPrice } from "../../utils/formatters.ts";
import { Badge } from "../common/Badge.tsx";

interface ProductDetailsModalProps {
    item: MarketplaceItem | null;
    onClose: () => void;
}

const ProductDetailsModal = ({
    item,
    onClose,
}: ProductDetailsModalProps) => {
    const { addItem, isInCollection } = useCollection();

    useEffect(() => {
        if (!item) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [item, onClose]);

    if (!item) return null;

    const inCollection = isInCollection(item.id, "Owned");
    const inWishlist = isInCollection(item.id, "Wishlist");

    const addTo = (collection: "Owned" | "Wishlist") => {
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
        <div
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 sm:p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-4xl sm:rounded-2xl bg-white shadow-2xl overflow-hidden"
                style={{ maxHeight: "100dvh", height: "100dvh" }}
            >
                <div className="flex flex-col h-full sm:max-h-[90vh] sm:h-auto">

                    <div className="flex justify-between items-center border-b px-4 sm:px-6 py-4 shrink-0">
                        <h2
                            id="product-modal-title"
                            className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-4"
                        >
                            {item.title}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        className="grid md:grid-cols-2 gap-0 overflow-y-auto flex-1"
                    >
                        <div className="bg-slate-100 h-52 sm:h-64 md:h-auto">
                            <Images
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-4 p-4 sm:p-6 overflow-y-auto">
                            <p className="text-2xl font-bold text-indigo-600">
                                {formatPrice(item.price)}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <Badge>{item.category}</Badge>
                                <Badge tone="warning">{item.condition}</Badge>
                            </div>

                            <div className="space-y-1.5 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium text-gray-900">Seller: </span>
                                    {item.sellerName}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-900">Location: </span>
                                    {item.location}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-900">Listed: </span>
                                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>

                            {item.description && (
                                <div>
                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                        Description
                                    </p>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            )}

                            <div className="flex-1" />

                            <div className="flex flex-col gap-2 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={() => addTo("Owned")}
                                    disabled={inCollection}
                                    className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all ${inCollection
                                            ? "bg-indigo-100 text-indigo-600 cursor-default"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                                        }`}
                                >
                                    {inCollection ? "✓ In Collection" : "+ Add to Collection"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addTo("Wishlist")}
                                    disabled={inWishlist}
                                    className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all ${inWishlist
                                            ? "bg-amber-100 text-amber-600 cursor-default"
                                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
                                        }`}
                                >
                                    {inWishlist ? "★ In Wishlist" : "☆ Add to Wishlist"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;