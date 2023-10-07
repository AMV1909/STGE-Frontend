import { useEffect, useState } from "react";
import { Navbar, SplitScreen, Curso } from "../../Components";
import { useAppSelector } from "../../Hooks/store";
import { toast } from "react-hot-toast";
import "./PerfilUser.css";

import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { getCourse, putCourse } from "../../API/Tutors";

export function PerfilUser() {
    const user = useAppSelector((state) => state.user);

    const [selectedContent, setSelectedContent] = useState("imagen");

    const CambiarHorario = () => {
        setSelectedContent("horarios");
    };
    const CambiarAsignatura = () => {
        setSelectedContent("asignatura");
    };
    const CambiarAgendadas = () => {
        setSelectedContent("agendadas");
    };
    const CambiarRealizadas = () => {
        setSelectedContent("realizadas");
    };



    const [cursos, setCursos] = useState([]);

    useEffect(() => {

        if (user.role === "Tutor") {
            getCourse(user._id).then((response) => {
                setCursos(response);
                console.log(response);
            });

        }
    }, [user]);

    const [updateCourses, setUpdateCourses] = useState([
         
    ]);


    const handleSelectCourse = (course) => {
        if (updateCourses.includes(course)) {
            setUpdateCourses(
                updateCourses.filter((updateCourse) => {
                    return updateCourse.nrc !== course.nrc;
                    
                })
            );
        } else {
            setUpdateCourses([...updateCourses, course]);
        }
    };

  

    
    const handleContinue = async () => {
       
        let updatedArrayFormatted = updateCourses.map(obj => ({
            ...obj, // Copy the existing properties
            grade: parseFloat(obj.grade) // Convert the salary property to a double
          }));
        console.log(updatedArrayFormatted);
        toast.loading("Registrando cursos...", {
            id: "loading",
            duration: 5000,
        });

         await putCourse(updatedArrayFormatted)
            .then(() => {
                toast.dismiss("loading");

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
    }

    
 




    return (
        <div>
            <Navbar />
            <SplitScreen>
                <div className="small-column">
                    <img src={user.picture} alt={user.name} id="imgUsuario" />
                    <div className=" datos">
                        <h5>{user.name}</h5>

                        <p className="dato">
                            {" "}
                            <b> ID: {user._id}</b>{" "}
                        </p>
                        <p className="dato">
                            {" "}
                            <b> Carrera: {user.career}</b>{" "}
                        </p>
                        <p className="dato">
                            {" "}
                            <b> Tiempo en reunion: {user.meetingTime}</b>{" "}
                        </p>
                    </div>

                    <div className="row rowbuttons ">
                        {user.role === "Tutor" && (
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={CambiarHorario}
                            >
                                Horarios
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={CambiarAgendadas}
                            >
                                Reuniones agendadas
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={CambiarRealizadas}
                            >
                                Reuniones realizadas
                            </button>
                        )}

                        {user.role === "Tutor" && (
                            <button
                                type="button"
                                id="CambiarAsignatura"
                                className="btn btn-light"
                                onClick={CambiarAsignatura}
                            >
                                Modificar asignatura a impartir
                            </button>
                        )}
                    </div>
                </div>
                <div className="large-column">
                    {selectedContent === "imagen" ? (
                        <div className="container imgHome">
                            <img
                                src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png"
                                alt="UnabImg"
                                id="UnabImg"
                            />
                        </div>
                    ) : selectedContent === "horarios" ? (
                        <div className="container imgHome">
                            <FullCalendar
                                plugins={[
                                    googleCalendarPlugin,
                                    interactionPlugin,
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    listPlugin,
                                ]}
                                initialView="dayGridMonth"
                                events={{
                                    googleCalendarId: user.tutorCalendarId,
                                }}
                                googleCalendarApiKey={
                                    import.meta.env.VITE_GOOGLE_API_KEY
                                }
                                buttonText={{
                                    today: "Hoy",
                                    month: "Mes",
                                    week: "Semana",
                                    day: "Día",
                                    list: "Lista",
                                }}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                                }}
                                eventClick={(info) => {
                                    if (!info.event.start) return;

                                    info.jsEvent.preventDefault();
                                    info.view.calendar.gotoDate(
                                        info.event.start
                                    );
                                    info.view.calendar.changeView(
                                        "timeGridDay"
                                    );
                                }}
                                locale="es"
                            />
                        </div>
                    ) : selectedContent === "agendadas" ? (
                        <div className="container imgHome">
                            <h1>AGENDADAS</h1>
                        </div>
                    ) : selectedContent === "realizadas" ? (
                        <div className="container imgHome">
                            <h1>REALIZADAS</h1>

                        </div>
                    ) : selectedContent === "asignatura" ? (
                        <div className="container imgHome">
                            <div className="Cursos-Container">
                                <h1>¿Que enseñaras?</h1>

                                {
                                    user && cursos &&
                                    cursos.map((course) => (
                                        <Curso
                                            key={course.nrc}
                                            course={course}
                                            handleSelectCourse={handleSelectCourse}
                                        />
                                    ))



                                }

                                {
                                    user && cursos &&
                                    <button
                                        className=" btnCurso"
                                        type="button"

                                        onClick={handleContinue}

                                    >
                                        Continuar
                                    </button>
                                }

                            </div>

                        </div>
                    ) : null}
                </div>
            </SplitScreen>
        </div>
    );
}




