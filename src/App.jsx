import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./Pages";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}
