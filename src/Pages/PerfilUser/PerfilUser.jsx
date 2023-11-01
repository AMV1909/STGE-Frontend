import { useState } from "react";
import { Navbar, SplitScreen } from "../../Components";
import { useAppSelector } from "../../Hooks/store";
import "./PerfilUser.css";

import { ProfileTabsComponent } from "../../Components/ProfileTabs/ProfileTabs";

export function PerfilUser() {
    const user = useAppSelector((state) => state.user);

    const [selectedContent, setSelectedContent] = useState("imagen");

    const [mostrarColumnaDerecha, setMostrarColumnaDerecha] = useState(false);

    

    
    const resetColumnaDerecha = () => {
      setMostrarColumnaDerecha(false);
    };

    const CambiarHorario = () => {
        if (window.innerWidth <= 768) {
            setMostrarColumnaDerecha(!mostrarColumnaDerecha);
        }
        setSelectedContent("horarios");
    };
    const CambiarAsignatura = () => {
        if (window.innerWidth <= 768) {
            setMostrarColumnaDerecha(!mostrarColumnaDerecha);
        }
        setSelectedContent("asignatura");
    };
    const CambiarAgendadas = () => {
        if (window.innerWidth <= 768) {
            setMostrarColumnaDerecha(!mostrarColumnaDerecha);
        }
        setSelectedContent("agendadas");
    };
    const CambiarRealizadas = () => {
        if (window.innerWidth <= 768) {
            setMostrarColumnaDerecha(!mostrarColumnaDerecha);
        }
        setSelectedContent("realizadas");
    };

    return (
        <div>
            <Navbar />
            <SplitScreen>
                <div className={`small-column ${mostrarColumnaDerecha ? 'columna-small-oculta' : ''}`}>
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
                        {user.role === "Tutor" && user.meetingTime && (
                            <p className="dato">
                                {" "}
                                <b>
                                    {" "}
                                    Tiempo en reunion:{" "}
                                    {new Date(user.meetingTime * 60000)
                                        .toISOString()
                                        .substr(11, 8)}
                                </b>{" "}
                            </p>
                        )}
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
                                onClick={() => setSelectedContent("requested")}
                            >
                                Reuniones solicitads
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
                <div className={`large-column${mostrarColumnaDerecha ? 'columna-large-visible' : ''}`}>
                    <button 
                    type="button" 
                    className=" btn btnAtras btn-link" 
                    onClick={resetColumnaDerecha}
                    >
                        Atras
                    </button>
                    <ProfileTabsComponent tab={selectedContent} />
                </div>
            </SplitScreen>
        </div>
    );
}
