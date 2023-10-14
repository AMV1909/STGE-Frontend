import { useRef, useState } from "react";
import {
    Navbar,
    Splitestudiantes,
    CardTutor,
    PTutorHome,
} from "../../Components";
import "./Home.css";
import { Calendar } from "../../Components/Calendar/Calendar";

export function Home() {
    const [tutorSeleccionado, setTutorSeleccionado] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const calendarRef = useRef(null);

    const handleCardClick = (tutor) => {
        setTutorSeleccionado(tutor);
    };

    return (
        <div className="home">
            <Navbar />
            <Splitestudiantes>
                <div className="left-column">
                    <div className="row divList ">
                        <CardTutor onCardClick={handleCardClick} />
                    </div>
                </div>
                <div className="right-columnHome">
                    <div className="imgcontainer">
                        <PTutorHome tutor={tutorSeleccionado} />

                        <div className=" rowUsuario">
                            <button
                                type="button"
                                className=" btnNTutor"
                                onClick={() => setIsSelecting(!isSelecting)}
                            >
                                Nueva Tutoria
                            </button>
                        </div>

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
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Splitestudiantes>
        </div>
    );
}
