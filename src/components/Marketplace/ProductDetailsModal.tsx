import type { MarketplaceItem } from "../../types";
import Images from "../common/Images.tsx";

interface ProductDetailsModalProps {
    item: MarketplaceItem | null;
    onClose: () => void;
}

const ProductDetailsModal = ({
                                 item,
                                 onClose,
                             }: ProductDetailsModalProps) => {
    if (!item) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl rounded-lg bg-white shadow-xl overflow-hidden"
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-2xl font-semibold">{item.title}</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div>
                        <Images src={item.image} alt={item.title} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-3xl font-bold">{item.title}</h3>

                        <p className="text-xl font-semibold text-green-600">
                            ${item.price}
                        </p>

                        <p>
                            <strong>Category:</strong> {item.category}
                        </p>

                        <p>
                            <strong>Condition:</strong> {item.condition}
                        </p>

                        <p>
                            <strong>Seller:</strong> {item.sellerName}
                        </p>

                        <p>
                            <strong>Listed:</strong>{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                        </p>

                        <div>
                            <strong>Description</strong>

                            <p className="mt-2 text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;