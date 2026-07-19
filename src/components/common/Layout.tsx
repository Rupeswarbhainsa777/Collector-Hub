import type { ReactNode } from "react";
import Sidebar from "./Sidebar.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
};

export default Layout;
