import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiUsers, FiPackage, FiArrowUpRight } from "react-icons/fi";

const PAGES = [
    {
        id: "nav-marketplace",
        icon: <FiShoppingBag size={18} />,
        title: "Marketplace",
        desc: "Browse and discover rare collectibles listed by sellers. Filter by category, condition, and price.",
        to: "/marketplace",
        cta: "Browse listings",
    },
    {
        id: "nav-community",
        icon: <FiUsers size={18} />,
        title: "Community",
        desc: "See what other collectors are sharing. Follow trends, discover new categories, and get inspired.",
        to: "/community",
        cta: "Explore community",
    },
    {
        id: "nav-collection",
        icon: <FiPackage size={18} />,
        title: "My Collection",
        desc: "Manage everything you own, wish for, or want to sell — all in one organised place.",
        to: "/collection",
        cta: "Open collection",
    },
];

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">


            <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight max-w-xl">
                    The home for serious collectors.
                </h1>
                <p className="mt-5 text-base text-gray-500 leading-relaxed max-w-md">
                    CollectorHub brings your marketplace, community, and personal
                    collection together in one clean, focused space.
                </p>
                <button
                    id="hero-cta"
                    onClick={() => navigate("/marketplace")}
                    className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-95 transition-all cursor-pointer"
                >
                    Browse the Marketplace
                    <FiArrowUpRight size={15} />
                </button>
            </section>


            <div className="mx-8 border-t border-gray-100" />


            <section className="px-8 pt-14 pb-20">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-7">
                        What's inside
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {PAGES.map((page) => (
                            <button
                                key={page.id}
                                id={page.id}
                                onClick={() => navigate(page.to)}
                                className="group flex flex-col items-start gap-2.5 p-5 rounded-xl border border-gray-200 bg-white text-left w-full font-[inherit] cursor-pointer hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                            >

                                <div className="flex items-center justify-between w-full">
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600">
                                        {page.icon}
                                    </span>
                                    <FiArrowUpRight
                                        size={15}
                                        className="text-gray-300 group-hover:text-gray-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                    />
                                </div>


                                <p className="text-sm font-bold text-gray-900">{page.title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                                    {page.desc}
                                </p>
                                <span className="text-xs font-semibold text-indigo-500">
                                    {page.cta}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;