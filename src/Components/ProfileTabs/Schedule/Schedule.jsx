import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

import { socket } from "../../../Socket";
import { useAppSelector } from "../../../Hooks/store";
import { updateAvailableSchedule } from "../../../API/Calendar";
import { Calendar } from "../../Calendar/Calendar";

import "./Schedule.css";

export function Schedule() {
    const user = useAppSelector((state) => state.user);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const calendarRef = useRef(null);

    const changeToSelect = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView("timeGridWeek");
            calendarRef.current.getApi().gotoDate(new Date());
        }

        setIsSelecting(true);
    };

    const handleCancelSelection = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView("dayGridMonth");
        }

        setIsSelecting(false);
        setSelectedDates([]);
    };

    const handleConfirmSelection = async () => {
        toast.loading("Guardando horarios...", {
            id: "loading",
            duration: Infinity,
        });

        await updateAvailableSchedule(selectedDates)
            .then(() => {
                toast.dismiss("loading");

                socket.emit("reject-all-requested-events", user._id);
                toast.success("Horarios guardados exitosamente.");

                if (calendarRef.current) {
                    calendarRef.current.getApi().refetchEvents();
                }
            })
            .catch((err) => {
                toast.dismiss("loading");
                toast.error("Ha ocurrido un error al guardar los horarios.");

                console.log(err);

                if (!err.response) return toast.error(err.message);
                if (err.response.status === 403)
                    return toast.error(
                        "Algunas de las fechas seleccionadas no son válidas."
                    );

                if (err.response.status === 405)
                    return toast.error(
                        "No puedes modificar tu horario mientras tienes tutorías agendadas."
                    );
            });

        setIsSelecting(false);
        setSelectedDates([]);
    };

    socket.on(`all-events-rejected-${user._id}`, () => {
        toast.success("Todas las solicitudes de tutorías han sido rechazadas.");
    });

    return (
        <div className="stge__profileTabs-schedule">
            <h1>Mis Horarios</h1>

            {isSelecting ? (
                <div className="stge__profileTabs-schedule_info">
                    <button className="scheduleButton" onClick={handleConfirmSelection}>
                        Confirmar Selección
                    </button>

                    <p>
                        Selecciona las fechas al arrastrar el cursor a través
                        del calendario. Recomendamos no seleccionar la opción
                        todo el día, eso ocasionará que puedan agendarte a
                        cualquier hora del día. En la parte inferior se
                        mostrarán las fechas seleccionadas. Si deseas eliminar
                        una fecha, puedes dar click en el botón de la papelera.
                    </p>

                    <button className="scheduleButton" onClick={handleCancelSelection}>
                        Cancelar Selección
                    </button>
                </div>
            ) : (
                <div className="stge__profileTabs-schedule_info">
                    <p>
                        Si deseas modificar tu horario de tutorías, puedes dar
                        click en el siguiente botón y selecionar las fechas al
                        arrastras el cursor a través del calendario. Por
                        defecto, tu horario estará vacío, lo que indica que no
                        tienes horarios disponibles para tutorías. Ten en
                        cuenta, que si ya tienes reuniones agendadas, no podrás
                        modificar tu horario, debes completarlas primero.
                    </p>

                    <button onClick={() => changeToSelect()}>
                        Activar Modo de Selección
                    </button>
                </div>
            )}

            {user.tutorCalendarId && (
                <Calendar
                    key={user._id}
                    typeCalendar="Profile"
                    calendarRef={calendarRef}
                    googleCalendarId={user.tutorCalendarId}
                    isSelecting={isSelecting}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                />
            )}
        </div>
    );
}
