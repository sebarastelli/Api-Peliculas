import {BrowserRouter as Router, Routes, Route, createBrowserRouter} from "react-router-dom";
import { LandingPage } from "../pages/LandingPages";

const myroutes = createBrowserRouter([
    {
        path:"/",
        element:<LandingPage/>
    }
]);

export default myroutes;