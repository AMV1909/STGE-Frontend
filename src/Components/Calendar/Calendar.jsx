import { BiSolidTrash } from "react-icons/bi";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "./Calendar.css";

export function Calendar({
    selectedDates,
    setSelectedDates,
    calendarRef,
    isSelecting,
    googleCalendarId,
    typeCalendar,
}) {
    const handleSelect = ({ start, end }) => {
        const isFollowedByDate = selectedDates.some(
            (date) =>
                end.getTime() === date.start.getTime() ||
                start.getTime() === date.end.getTime()
        );

        if (isFollowedByDate) {
            const newSelectedDates = selectedDates.map((date) => {
                if (end.getTime() === date.start.getTime()) {
                    return {
                        ...date,
                        start,
                    };
                } else if (start.getTime() === date.end.getTime()) {
                    return {
                        ...date,
                        end,
                    };
                }

                return date;
            });

            const overlappingDates = [];

            newSelectedDates.forEach((date) => {
                const isOverlapping = overlappingDates.some(
                    (overlappingDate) =>
                        date.start.getTime() < overlappingDate.end.getTime() &&
                        date.end.getTime() > overlappingDate.start.getTime()
                );

                if (isOverlapping) {
                    const overlappingDate = overlappingDates.find(
                        (overlappingDate) =>
                            date.start.getTime() <
                                overlappingDate.end.getTime() &&
                            date.end.getTime() > overlappingDate.start.getTime()
                    );

                    if (overlappingDate) {
                        overlappingDate.start =
                            overlappingDate.start.getTime() <
                            date.start.getTime()
                                ? overlappingDate.start
                                : date.start;
                        overlappingDate.end =
                            overlappingDate.end.getTime() > date.end.getTime()
                                ? overlappingDate.end
                                : date.end;
                    }
                } else {
                    overlappingDates.push(date);
                }
            });

            return setSelectedDates(overlappingDates);
        }

        setSelectedDates([
            ...selectedDates,
            {
                title: "Disponible",
                description: "Horario disponible para tutorías",
                attendees: [],
                start,
                end,
            },
        ]);
    };

    const handleDeleteDate = (date) => {
        setSelectedDates(
            selectedDates.filter((selectedDate) => {
                return selectedDate.start !== date;
            })
        );
    };

    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[
                    googleCalendarPlugin,
                    interactionPlugin,
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                ]}
                initialView="dayGridMonth"
                events={isSelecting ? selectedDates : { googleCalendarId }}
                googleCalendarApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                buttonText={{
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    list: "Lista",
                }}
                headerToolbar={{
                    left:
                        isSelecting && typeCalendar === "Profile"
                            ? ""
                            : "prev,next today",
                    center: "title",
                    right:
                        isSelecting && typeCalendar === "Profile"
                            ? ""
                            : "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                dateClick={(info) => {
                    if (!isSelecting) {
                        info.view.calendar.gotoDate(info.date);
                        info.view.calendar.changeView("timeGridDay");
                    }
                }}
                eventClick={(info) => {
                    if (!info.event.start) return;

                    info.jsEvent.preventDefault();

                    if (!isSelecting) {
                        info.view.calendar.gotoDate(info.event.start);
                        info.view.calendar.changeView("timeGridDay");
                    }
                }}
                selectable={isSelecting}
                select={handleSelect}
                selectOverlap={typeCalendar !== "Profile"}
                locale="es"
            />
            <div className="stge__calendar-selectedDates">
                {selectedDates.length > 0 && (
                    <>
                        <h1>Horarios Seleccionados</h1>

                        <ul>
                            {selectedDates.map((date) => {
                                const isAllDay =
                                    date.start.getHours() === 0 &&
                                    date.start.getMinutes() === 0 &&
                                    date.end.getHours() === 0 &&
                                    date.end.getMinutes() === 0;

                                let start = date.start.toLocaleDateString(
                                    "es-CO",
                                    { weekday: "long" }
                                );

                                start =
                                    start.charAt(0).toUpperCase() +
                                    start.slice(1);

                                let end = new Date(date.end);

                                if (isAllDay) {
                                    end.setDate(end.getDate() - 1);
                                }

                                end = end.toLocaleDateString("es-CO", {
                                    weekday: "long",
                                });

                                end =
                                    end.charAt(0).toUpperCase() + end.slice(1);

                                return (
                                    <div key={date.start.toString()}>
                                        <li>
                                            <p>
                                                {start === end
                                                    ? start
                                                    : start === "Domingo" &&
                                                      end === "Sábado"
                                                    ? "Todos los días"
                                                    : `${start} - ${end}`}
                                            </p>

                                            <p>
                                                {isAllDay
                                                    ? "Todo el día"
                                                    : `${date.start.toLocaleTimeString(
                                                          "es-CO",
                                                          {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          }
                                                      )} - ${date.end.toLocaleTimeString(
                                                          "es-CO",
                                                          {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          }
                                                      )}`}
                                            </p>
                                        </li>

                                        <button
                                            onClick={() =>
                                                handleDeleteDate(date.start)
                                            }
                                        >
                                            <BiSolidTrash />
                                        </button>
                                    </div>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}
