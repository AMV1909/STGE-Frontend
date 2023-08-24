import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./Pages";
import { SignUp } from "./Pages/Sign Up/SignUp";



export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
             

            </Routes>
        </Router>
    );
}
