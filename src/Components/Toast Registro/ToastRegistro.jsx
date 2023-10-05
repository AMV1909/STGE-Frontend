import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getTempUserData, googleRegisterStudent } from "../../API/Session";
import { useTempUserActions } from "../../Hooks/useTempUserActions";

import "./ToastRegistro.css";

export function ToastRegistro({ t }) {
    const navigate = useNavigate();
    const { setTempUser } = useTempUserActions();
    const [esEstudiante, setEsEstudiante] = useState(false);
    const [esTutor, setEsTutor] = useState(false);

    const handleEstudianteChange = () => {
        setEsEstudiante(!esEstudiante);
        setEsTutor(false);

        toast.dismiss("role");
    };

    const handleTutorChange = () => {
        setEsTutor(!esTutor);
        setEsEstudiante(false);

        toast.dismiss("role");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!esEstudiante && !esTutor) {
            return toast.error("Selecciona un rol", {
                id: "role",
                duration: 5000,
            });
        }

        if (esEstudiante) {
            toast.dismiss(t.id);
            toast.loading("Registrando usuario...", {
                id: "loading",
                duration: 5000,
            });

            await googleRegisterStudent()
                .then(() => {
                    toast.dismiss("loading");
                    toast.success("Usuario registrado con éxito", {
                        duration: 5000,
                    });

                    navigate("/");
                })
                .catch((err) => {
                    toast.dismiss("loading");
                    toast.error("Error al registrarse", { duration: 5000 });

                    console.log(err);

                    if (err.response?.status === 400) {
                        return toast.error(
                            "El correo seleccionado no es válido",
                            {
                                duration: 5000,
                            }
                        );
                    }

                    if (err.response?.status === 405) {
                        return toast.error(
                            "Ya existe una cuenta con este correo",
                            {
                                duration: 5000,
                            }
                        );
                    }

                    toast.error(err.message, { duration: 5000 });
                });
        }

        if (esTutor) {
            toast.dismiss(t.id);
            toast.loading("Obteniendo información...", {
                id: "loading",
                duration: 5000,
            });

            await getTempUserData()
                .then((res) => {
                    toast.dismiss("loading");

                    res.courses.forEach((course) => {
                        return (course.grade = Number(course.grade));
                    });

                    setTempUser(res);
                    navigate("/select-cursos");

                    toast.success("Bienvenido", { duration: 5000 });
                    toast.success(
                        "Por favor, seleccione los cursos que desea registrar",
                        {
                            duration: 5000,
                        }
                    );
                })
                .catch((err) => {
                    toast.dismiss("loading");
                    toast.error("Error al registrarse", { duration: 5000 });

                    if (err.response?.status === 400) {
                        return toast.error(
                            "El correo seleccionado no es válido",
                            {
                                duration: 5000,
                            }
                        );
                    }

                    if (err.response?.status === 405) {
                        return toast.error(
                            "Ya existe una cuenta con este correo",
                            {
                                duration: 5000,
                            }
                        );
                    }

                    toast.error(err.message, { duration: 5000 });
                });
        }
    };

    return (
        <div className="divtoast">
            <h5>Seleciona tu rol para continuar {"\n"}</h5>

            <form onSubmit={handleSubmit}>
                <div className=" toastform">
                    <label className="tutorLabel">
                        {" "}
                        <input
                            type="checkbox"
                            checked={esTutor}
                            onChange={handleTutorChange}
                        ></input>
                        Tutor
                    </label>
                    <label className="estudianteLabel">
                        <input
                            type="checkbox"
                            checked={esEstudiante}
                            onChange={handleEstudianteChange}
                        ></input>
                        Estudiante
                    </label>
                    <br />
                </div>
                <div className="divSeleccion">
                    Selección: {esEstudiante ? "Estudiante" : ""}{" "}
                    {esTutor ? "Tutor" : ""}
                </div>

                <button className="btnToast">Continuar</button>
            </form>
        </div>
    );
}
