import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar, { MobileMenuButton } from "./Sidebar.tsx";
import { FiGrid } from "react-icons/fi";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <div className="flex flex-1 min-w-0 flex-col">
                {/* Mobile top bar — only visible on small screens */}
                <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
                    <MobileMenuButton onClick={() => setMobileOpen(true)} />
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-[0_2px_8px_rgba(99,102,241,0.35)]">
                            <FiGrid size={15} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-bold tracking-[-0.01em] text-gray-900">
                            CollectorHub
                        </span>
                    </div>
                </header>

                <main className="flex-1 min-w-0 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
