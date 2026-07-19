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

    const ownedCount = items.filter((i) => i.collection === "Owned").length;
    const wishlistCount = items.filter((i) => i.collection === "Wishlist").length;
    const sellingCount = items.filter((i) => i.collection === "Selling").length;

    const sections: NavSection[] = [
        {
            title: "OVERVIEW",
            items: [
                {
                    to: "/marketplace",
                    label: "Marketplace",
                    icon: <FiShoppingBag size={17} />,
                },
                {
                    to: "/community",
                    label: "Community",
                    icon: <FiUsers size={17} />,
                },
            ],
        },
        {
            title: "MY COLLECTION",
            items: [
                {
                    to: "/collection?tab=Owned",
                    label: "Owned",
                    icon: <FiPackage size={17} />,
                    badge: ownedCount || null,
                },
                {
                    to: "/collection?tab=Wishlist",
                    label: "Wishlist",
                    icon: <FiStar size={17} />,
                    badge: wishlistCount || null,
                },
                {
                    to: "/collection?tab=Selling",
                    label: "Selling",
                    icon: <FiTag size={17} />,
                    badge: sellingCount || null,
                },
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
                    "sidebar-root",
                    collapsed ? "sidebar-collapsed" : "sidebar-expanded",
                ].join(" ")}
            >
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">
                        <FiGrid size={18} strokeWidth={2.5} />
                    </div>
                    {!collapsed && (
                        <span className="sidebar-logo-text">CollectorHub</span>
                    )}
                </div>

                <button
                    className="sidebar-toggle"
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <FiChevronRight size={15} />
                    ) : (
                        <FiChevronLeft size={15} />
                    )}
                </button>

                <nav className="sidebar-nav">
                    {sections.map((section) => (
                        <div key={section.title} className="sidebar-section">
                            {!collapsed && section.title && (
                                <p className="sidebar-section-title">{section.title}</p>
                            )}

                            {section.items.map((item) => {
                                const active = isActive(item.to);

                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={[
                                            "sidebar-nav-item",
                                            active ? "sidebar-nav-item--active" : "",
                                            collapsed
                                                ? "sidebar-nav-item--collapsed"
                                                : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <span className="sidebar-nav-icon">
                                            {item.icon}
                                        </span>

                                        {!collapsed && (
                                            <>
                                                <span className="sidebar-nav-label">
                                                    {item.label}
                                                </span>

                                                {item.badge != null &&
                                                    item.badge > 0 && (
                                                        <span
                                                            className={[
                                                                "sidebar-badge",
                                                                active
                                                                    ? "sidebar-badge--active"
                                                                    : "",
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
                    "sidebar-spacer",
                    collapsed ? "sidebar-spacer--collapsed" : "",
                ].join(" ")}
            />
        </>
    );
};

export default Sidebar;