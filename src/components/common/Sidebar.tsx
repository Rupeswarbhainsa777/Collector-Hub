import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCollection } from "../../context/CollectionContext.tsx";
import {
    FiGrid,
    FiShoppingBag,
    FiUsers,
    FiChevronLeft,
    FiChevronRight,
    FiTag,
    FiPackage,
    FiStar,
} from "react-icons/fi";

interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
    badge?: number | null;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { items } = useCollection();
    const location = useLocation();

    const ownedCount    = items.filter((i) => i.collection === "Owned").length;
    const wishlistCount = items.filter((i) => i.collection === "Wishlist").length;
    const sellingCount  = items.filter((i) => i.collection === "Selling").length;

    const sections: NavSection[] = [
        {
            title: "OVERVIEW",
            items: [
                { to: "/marketplace", label: "Marketplace", icon: <FiShoppingBag size={17} /> },
                { to: "/community",   label: "Community",   icon: <FiUsers size={17} /> },
            ],
        },
        {
            title: "MY COLLECTION",
            items: [
                { to: "/collection?tab=Owned",    label: "Owned",    icon: <FiPackage size={17} />, badge: ownedCount    || null },
                { to: "/collection?tab=Wishlist", label: "Wishlist", icon: <FiStar size={17} />,    badge: wishlistCount || null },
                { to: "/collection?tab=Selling",  label: "Selling",  icon: <FiTag size={17} />,     badge: sellingCount  || null },
            ],
        },
    ];

    const isActive = (to: string) => {
        const [path] = to.split("?");
        if (to.includes("?tab=")) {
            const tab = new URLSearchParams(to.split("?")[1]).get("tab");
            const currentTab = new URLSearchParams(location.search).get("tab");
            return location.pathname === path && (currentTab ?? "Owned") === tab;
        }
        return location.pathname === path;
    };

    return (
        <>

            <aside
                className={[
                    "fixed top-0 left-0 h-screen bg-white border-r border-gray-200",
                    "flex flex-col z-50",
                    "transition-[width] duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "shadow-[1px_0_0_0_#e5e7eb,4px_0_16px_-4px_rgba(0,0,0,0.04)]",
                    collapsed ? "w-16" : "w-60",
                ].join(" ")}
            >

                <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-200 overflow-hidden whitespace-nowrap shrink-0">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-[0_2px_8px_rgba(99,102,241,0.35)]">
                        <FiGrid size={18} strokeWidth={2.5} />
                    </div>
                    {!collapsed && (
                        <span className="text-[0.95rem] font-bold tracking-[-0.01em] text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                            CollectorHub
                        </span>
                    )}
                </div>


                <button
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-gray-50 border border-gray-200 text-gray-500 flex items-center justify-center cursor-pointer z-10 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-[background,color,box-shadow] duration-150 hover:bg-gray-100 hover:text-gray-900 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                >
                    {collapsed ? <FiChevronRight size={15} /> : <FiChevronLeft size={15} />}
                </button>


                <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pt-2 flex flex-col gap-1">
                    {sections.map((section) => (
                        <div key={section.title} className="flex flex-col pb-2">
                            {!collapsed && section.title && (
                                <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-gray-500 px-2 pt-2.5 pb-1 uppercase whitespace-nowrap overflow-hidden">
                                    {section.title}
                                </p>
                            )}

                            {section.items.map((item) => {
                                const active = isActive(item.to);
                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        title={collapsed ? item.label : undefined}
                                        className={[
                                            "flex items-center gap-2.5 rounded-lg text-sm whitespace-nowrap overflow-hidden",
                                            "transition-[background,color] duration-150 no-underline",
                                            collapsed ? "justify-center p-2.5" : "px-2.5 py-2",
                                            active
                                                ? "bg-gray-100 text-gray-900 font-semibold"
                                                : "text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900",
                                        ].join(" ")}
                                    >

                                        <span className="shrink-0 flex items-center">
                                            {item.icon}
                                        </span>


                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 overflow-hidden text-ellipsis">
                                                    {item.label}
                                                </span>

                                                {item.badge != null && item.badge > 0 && (
                                                    <span
                                                        className={[
                                                            "shrink-0 min-w-[20px] h-5 px-1.5 rounded-[10px]",
                                                            "text-[0.7rem] font-semibold flex items-center justify-center",
                                                            "transition-[background,color] duration-150",
                                                            active
                                                                ? "bg-gray-900 text-white"
                                                                : "bg-gray-200 text-gray-500",
                                                        ].join(" ")}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </aside>


            <div
                className={[
                    "shrink-0 transition-[width] duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    collapsed ? "w-16" : "w-60",
                ].join(" ")}
            />
        </>
    );
};

export default Sidebar;