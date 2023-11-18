import { useEffect, useRef, useState } from "react";
import {
    Navbar,
    Splitestudiantes,
    CardTutor,
    PTutorHome,
} from "../../Components";
import "./Home.css";
import { Calendar } from "../../Components/Calendar/Calendar";
import { useAppSelector } from "../../Hooks/store";
import { requestEvent } from "../../API/Events";
import toast from "react-hot-toast";
import { useUserActions } from "../../Hooks/useUserActions";
import { useNavigate } from "react-router-dom";

import { socket } from "../../Socket";
import { getTutors } from "../../API/Tutors";
import { useTutorsActions } from "../../Hooks/useTutorsActions";

export function Home() {
    const [mostrarColumnaDerecha, setMostrarColumnaDerecha] = useState(false);
    const [tutorSeleccionado, setTutorSeleccionado] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const { logoutUser } = useUserActions();
    const user = useAppSelector((state) => state.user);
    const calendarRef = useRef(null);
    const navigate = useNavigate();
    const { setTutors } = useTutorsActions();
    const tutors = useAppSelector((state) => state.tutors);

    const toggleColumnaDerecha = () => {
        if (window.innerWidth <= 768) {
            setMostrarColumnaDerecha(!mostrarColumnaDerecha);
        }
    };

    const resetColumnaDerecha = () => {
        setMostrarColumnaDerecha(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMostrarColumnaDerecha(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsSelecting(false);
    }, [tutorSeleccionado]);

    useEffect(() => {
        if (tutors.length === 0 || tutors[0]._id !== "") return;

        getTutors()
            .then((response) => {
                setTutors(response);
            })
            .catch((err) => {
                toast.error("Error al obtener tutores", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
            });
    }, [setTutors, tutors]);

    const changeToSelect = () => {
        if (calendarRef.current) {
            if (isSelecting) {
                calendarRef.current.getApi().changeView("dayGridMonth");
                setSelectedDates([]);
            } else {
                calendarRef.current.getApi().changeView("timeGridWeek");
                calendarRef.current.getApi().gotoDate(new Date());
            }
        }

        setIsSelecting(!isSelecting);
    };

    const handleCardClick = (tutor) => {
        setTutorSeleccionado(tutor);
    };

    const handleContinue = async () => {
        await requestEvent(selectedDates)
            .then(() => {
                socket.emit(
                    "event-requested",
                    user._id,
                    tutorSeleccionado._id,
                    selectedDates[0].course
                );

                toast.success("Tutoría agendada con éxito", { duration: 5000 });
            })
            .catch((err) => {
                toast.error("Error al agendar tutoría", { duration: 5000 });

                if (!err.response)
                    return toast.error(err.message, { duration: 5000 });

                if (err.response.status === 413) {
                    return toast.error(
                        "Ya tienes una tutoría agendada con este tutor, por favor espera a que se complete para agendar otra",
                        { duration: 5000 }
                    );
                }

                if (err.response.status === 415) {
                    return toast.error(
                        "El horario seleccionado se cruza con una tutoría que ya tienes agendada o que has solicitado, por favor selecciona otro horario",
                        { duration: 5000 }
                    );
                }

                if (err.response.status === 500) {
                    logoutUser();
                    navigate("/");
                    return toast.error("La sesión ha expirado");
                }
            });

        setIsSelecting(false);
        setSelectedDates([]);
    };

    return (
        <div className="home">
            <Navbar />
            <Splitestudiantes>
                <div
                    className={`left-column ${
                        mostrarColumnaDerecha ? "columna-izquierda-oculta" : ""
                    }`}
                >
                    <div className="row divList ">
                        {tutors.map((tutor) => (
                            <CardTutor
                                key={tutor._id}
                                tutor={tutor}
                                onCardClick={handleCardClick}
                                onToggleClick={toggleColumnaDerecha}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={`right-columnHome${
                        mostrarColumnaDerecha ? "columna-derecha-visible" : ""
                    }`}
                >
                    <div className="imgcontainer">
                        <PTutorHome tutor={tutorSeleccionado} />

                        <div className=" rowUsuario1">
                            <button
                                type="button"
                                className=" btnNTutor"
                                onClick={() => changeToSelect()}
                            >
                                {isSelecting
                                    ? "Cancelar Selección"
                                    : "Nueva Tutoría"}
                            </button>
                            <br />
                            <button
                                type="button"
                                className=" btn btnAtras btn-link"
                                onClick={resetColumnaDerecha}
                            >
                                Atras
                            </button>
                        </div>

                        {isSelecting && <p>Seleccione la fecha</p>}

                        {tutorSeleccionado && (
                            <div className="calendar">
                                <Calendar
                                    key={tutorSeleccionado._id}
                                    typeCalendar="Home"
                                    calendarRef={calendarRef}
                                    googleCalendarId={
                                        tutorSeleccionado.tutorCalendarId
                                    }
                                    isSelecting={isSelecting}
                                    selectedDates={selectedDates}
                                    setSelectedDates={setSelectedDates}
                                    tutor={tutorSeleccionado}
                                    user={user}
                                />
                            </div>
                        )}

                        {isSelecting && selectedDates.length > 0 && (
                            <button id="continue" onClick={handleContinue}>
                                Agendar Tutoría
                            </button>
                        )}
                    </div>
                </div>
            </Splitestudiantes>
        </div>
    );
}
