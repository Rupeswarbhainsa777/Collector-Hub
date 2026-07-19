import type { ReactNode } from "react";
import Sidebar from "./Sidebar.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout-root">
            <Sidebar />
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
