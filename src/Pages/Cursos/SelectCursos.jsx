import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Splitestudiantes, Curso } from "../../Components";
import { useAppSelector } from "../../Hooks/store";
import { useTempUserActions } from "../../Hooks/useTempUserActions";

import "./SelectCursos.css";
import { googleRegisterTutor } from "../../API/Session";

export function SelectCursos() {
    const navigate = useNavigate();
    const tempUser = useAppSelector((state) => state.tempUser);
    const { deleteData } = useTempUserActions();
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        document.title = "Seleccionar cursos - Plan Padrino";
    }, []);

    const handleSelectCourse = (course) => {
        if (selectedCourses.includes(course)) {
            setSelectedCourses(
                selectedCourses.filter((selectedCourse) => {
                    return selectedCourse.nrc !== course.nrc;
                })
            );
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleContinue = async () => {
        toast.loading("Registrando cursos...", {
            id: "loading",
            duration: 5000,
        });

        await googleRegisterTutor(selectedCourses)
            .then(() => {
                toast.dismiss("loading");

                deleteData();
                navigate("/");

                toast.success("Cursos registrados con éxito", {
                    duration: 5000,
                });
            })
            .catch((err) => {
                toast.dismiss("loading");
                toast.error("Error al registrar los cursos", {
                    duration: 5000,
                });

                if (!err.response) return toast.error(err.message);

                if (err.response.status === 403)
                    toast.error(
                        "Algunos de los cursos que intenta registrar no cumplen con los requisitos"
                    );
            });
    };

    return (
        <>
            <Splitestudiantes>
                <div className="left-columnCursos">
                    <div className="Cursos">
                        <h1 className="tituloCursos">Cursos</h1>

                        <p className="PGA">
                            Periodo acumulado (PGA):{" "}
                            <p
                                style={{
                                    color:
                                        tempUser.pga >= 3.8
                                            ? "#008f39"
                                            : "#ff0000",
                                }}
                            >
                                {tempUser && tempUser.pga}
                            </p>
                        </p>

                        <div className="SelectCursos-Container">
                            {tempUser &&
                                tempUser.courses &&
                                tempUser.pga >= 3.8 &&
                                tempUser.courses.map((course) => (
                                    <Curso
                                        key={course.nrc}
                                        course={course}
                                        handleSelectCourse={handleSelectCourse}
                                    />
                                ))}

                            {tempUser &&
                                tempUser.courses &&
                                tempUser.pga <= 3.8 && (
                                    <p>
                                        Su PGA es demasiado bajo para poder
                                        registrarse como tutor{" "}
                                    </p>
                                )}
                        </div>

                        <div className="Cursos-buttons">
                            <button
                                className=" btnCurso1"
                                onClick={() => navigate("/sign-up")}
                            >
                                Regresar
                            </button>

                            {tempUser &&
                                tempUser.courses &&
                                tempUser.pga >= 3.8 && (
                                    <button
                                        className=" btnCurso"
                                        disabled={selectedCourses.length === 0}
                                        onClick={handleContinue}
                                    >
                                        Continuar
                                    </button>
                                )}
                        </div>
                    </div>
                </div>

                <div className="right-columnSelectCurso Textdiv">
                    <div className="textside">
                        <h1 className="titulo1">¿Que enseñarás?</h1>
                        <p className="text">
                            <br />
                            Seleccionar los cursor que quieres enseñar
                        </p>
                    </div>
                </div>
            </Splitestudiantes>
        </>
    );
}
