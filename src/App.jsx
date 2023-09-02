import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./Pages";
import { SignUp } from "./Pages/Sign Up/SignUp";
import { Home } from "./Pages/Inicio/Home";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}
