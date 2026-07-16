import './App.css'
import {Route, Routes} from "react-router";

import Community from "./pages/Community.tsx";
import MarketplacePage from "./pages/Marketplace.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import PageNotFound from "./pages/NotFound.tsx";
import PostDetails from "./pages/PostDetails.tsx";
import MyCollection from "./pages/MyCollection.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Community/>}/>
            <Route path="/market" element={<MarketplacePage/>}/>
            <Route path="/product" element={<ProductDetails/>}/>
            <Route path="/pagenot" element={<PageNotFound/>}/>
            <Route path="/post" element={<PostDetails/>}/>
            <Route path="/collection" element={<MyCollection/>}/>


        </Routes>
    )
}

export default App;
