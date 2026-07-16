import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Community from "./pages/Community";
import MarketplacePage from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";
import MyCollection from "./pages/MyCollection";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<MarketplacePage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/product" element={<ProductDetails />} />
                <Route path="/post" element={<PostDetails />} />
                <Route path="/collection" element={<MyCollection />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;