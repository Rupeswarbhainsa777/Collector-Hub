import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/common/Layout.tsx";

import Community from "./pages/Community";
import MarketplacePage from "./pages/Marketplace";
import PageNotFound from "./pages/NotFound";
import MyCollection from "./pages/MyCollection";
import { CollectionProvider } from "./context/CollectionContext.tsx";
import { FeedInteractionsProvider } from "./context/FeedInteractionsProvider.tsx";

function App() {
    return (
        <CollectionProvider>
            <FeedInteractionsProvider>
                <Layout>
                    <Routes>
                        <Route path="/marketplace" element={<MarketplacePage />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/collection" element={<MyCollection />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Layout>
            </FeedInteractionsProvider>
        </CollectionProvider>
    );
}

export default App;