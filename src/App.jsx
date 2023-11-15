import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ProtectedRoute } from "./Auth/ProtectedRoute";
import { PageLoader, SocketListener } from "./Components";
import {
    Login,
    SignUp,
    Home,
    LEstudiantes,
    SelectCursos,
    NotFound,
    Administrar,
    PerfilUser,
} from "./Pages";

import "./App.css";

export function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <PageLoader setLoading={setLoading} />
            ) : (
                <Router>
                    <SocketListener />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/sign-up"
                            element={
                                <ProtectedRoute>
                                    <SignUp />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/lista-estudiantes"
                            element={
                                <ProtectedRoute>
                                    <LEstudiantes />
                                </ProtectedRoute>
                            }
                        />

                        <Route>
                            <Route
                                path="/administrar"
                                element={
                                    <ProtectedRoute>
                                        <Administrar />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        <Route
                            path="/select-cursos"
                            element={
                                <ProtectedRoute>
                                    <SelectCursos />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/perfil"
                            element={
                                <ProtectedRoute>
                                    <PerfilUser />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>

                    <Toaster />
                </Router>
            )}
        </>
    );
}
