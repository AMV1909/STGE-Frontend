import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Home, LEstudiantes } from "./Pages";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/lista-estudiantes" element={<LEstudiantes />} />
            </Routes>
        </Router>
    );
}
