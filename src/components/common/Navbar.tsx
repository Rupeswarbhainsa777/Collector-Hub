import {NavLink, useNavigate} from "react-router";
import { useState } from "react";
import {
    FaBars,
    FaTimes,
} from "react-icons/fa";

const navItems = [
    { to: "/marketplace", label: "Marketplace" },
    { to: "/community", label: "Community" },
    { to: "/product", label: "Product" },
    { to: "/post", label: "Post" },
    { to: "/collection", label: "My Collection" },
];




const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const letsStart= ()=>{
       navigate("/");
    }

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="text-[1.35rem] font-bold tracking-tight text-gray-900"
                    >
                        CollectorHub
                    </NavLink>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) =>
                                    [
                                        "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900",
                                    ].join(" ")
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Right Actions */}
                    <div className="hidden items-center gap-5 lg:flex">

                        <button onClick={letsStart} className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.97]">
                            Get started
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {open ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={[
                        "overflow-hidden border-t border-gray-100 transition-all duration-300 ease-in-out lg:hidden",
                        open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 border-t-transparent",
                    ].join(" ")}
                >
                    <div className="flex flex-col gap-1 px-6 py-4">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) =>
                                    [
                                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                                        isActive
                                            ? "bg-gray-50 text-gray-900"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                    ].join(" ")
                                }
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}

                        <div className="my-2 border-t border-gray-100" />

                        <button className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900">
                            Sign in
                        </button>
                        <button className="mt-1 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]">
                            Get started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;