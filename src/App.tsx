import './App.css'
import {Route, Routes} from "react-router";
import Navbar from "./components/Navbar.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Navbar/>}/>

        </Routes>
    )
}

export default App;
