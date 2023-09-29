import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PageLoader } from "./Components";
import {
    Login,
    SignUp,
    Home,
    LEstudiantes,
    SelectCursos,
    NotFound,
    PerfilUser,
} from "./Pages";

export function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <PageLoader setLoading={setLoading} />
            ) : (
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/lista-estudiantes"
                            element={<LEstudiantes />}
                        />
                        <Route path="*" element={<NotFound />} />
                        <Route
                            path="/select-cursos"
                            element={<SelectCursos />}
                        />
                        <Route path="/perfil" element={<PerfilUser />} />
                    </Routes>

                    <Toaster />
                </Router>
            )}
        </>
    );
}
