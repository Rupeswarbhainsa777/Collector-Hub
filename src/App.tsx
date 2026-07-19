import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar.tsx";

import Community from "./pages/Community";
import MarketplacePage from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";
import MyCollection from "./pages/MyCollection";
import {CollectionProvider} from "./context/CollectionContext.tsx";
import {FeedInteractionsProvider} from "./context/FeedInteractionsProvider.tsx";

function App() {
    return (
        <CollectionProvider>
            <FeedInteractionsProvider >
            <Navbar />

            <Routes>
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/marketplace/:id" element={<ProductDetails />} />
                <Route path="/post" element={<PostDetails />} />
                <Route path="/collection" element={<MyCollection />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            </FeedInteractionsProvider>
        </CollectionProvider>
    );
}

export default App;