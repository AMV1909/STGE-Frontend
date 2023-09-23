import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Home, LEstudiantes, SelectCursos, NotFound } from "./Pages";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/lista-estudiantes" element={<LEstudiantes />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/select-cursos" element={<SelectCursos />} />
            </Routes>
        </Router>
    );
}
