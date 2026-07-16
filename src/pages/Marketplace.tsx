import { useState } from "react";
import products from "../data/marketplace.json";
import SearchBar from "../components/SearchBar";

const Marketplace = () => {
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-8 border-b border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                        Marketplace
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        Find and buy high-quality collectibles from sellers in the community.
                    </p>
                </div>
            </div>


            <div className="mb-8">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:border-gray-400 hover:shadow-xs transition-all duration-150"
                    >

                        <div className="relative aspect-video bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover animate-fade-in"
                                loading="lazy"
                            />
                        </div>


                        <div className="p-4 flex flex-col flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                                {item.title}
                            </h2>

                            <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                                <div>
                                    <span className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">Price</span>
                                    <p className="text-sm font-bold text-gray-900">
                                        ₹{item.price.toLocaleString("en-IN")}
                                    </p>
                                </div>
                                <button className="inline-flex items-center justify-center bg-gray-900 hover:bg-black text-white text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors cursor-pointer">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;