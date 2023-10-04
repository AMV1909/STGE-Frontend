import { useState } from "react";
import { Navbar, SplitScreen, Curso } from "../../Components";
import { useAppSelector } from "../../Hooks/store";
import "./PerfilUser.css";
import { useTempUserActions } from "../../Hooks/useTempUserActions";





export function PerfilUser() {
    const user = useAppSelector((state) => state.user);


    const [selectedContent, setSelectedContent] = useState('imagen');

    const CambiarHorario = () => {
        setSelectedContent('horarios');
    };
    const CambiarAsignatura = () => {
        setSelectedContent('asignatura');
    }
    const CambiarAgendadas = () => {
        setSelectedContent('agendadas');
    }
    const CambiarRealizadas = () => {
        setSelectedContent('realizadas');
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
                            <button type="button" className="btn btn-light" onClick={CambiarHorario}>
                                Horarios
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button type="button" className="btn btn-light" onClick={CambiarAgendadas}>
                                Reuniones agendadas
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button type="button" className="btn btn-light" onClick={CambiarRealizadas}>
                                Reuniones realizadas
                            </button>
                        )}

                        {user.role === "Tutor" && (
                            <button type="button" id="CambiarAsignatura" className="btn btn-light" onClick={CambiarAsignatura}>
                                Modificar asignatura a impartir
                            </button>
                        )}
                    </div>
                </div>
                <div className="large-column">

                    {selectedContent === 'imagen' ? (
                        <div className="container imgHome">
                            <img
                                src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png"
                                alt="UnabImg"
                                id="UnabImg"
                            />
                        </div>
                    ) : selectedContent === 'horarios' ? (
                        <div className="container imgHome">
                            <h1>Horarios</h1>

                        </div>
                    ) : selectedContent === 'agendadas' ? (
                        <div className="container imgHome">
                            <h1>AGENDADAS</h1>

                        </div>
                    ) : selectedContent === 'realizadas' ? (
                        <div className="container imgHome">
                            <h1>realizadas</h1>

                        </div>
                    ) : selectedContent === 'asignatura' ? (
                        <div className="container imgHome">

                            <div className="Cursos-Container">
                                <h1>¿Que enseñaras?</h1>
                               
                                {user && 
                                    user.coursesToTeach &&
                                    user.pga >= 3.8 &&
                                    user.coursesToTeach.map((course) => (
                                        <Curso
                                            key={course.nrc}
                                            course={course}
                                         
                                        />
                                    ))}
                                

                                <button
                                    className=" btnCurso"
                                    style={{ marginLeft: "40%" }}
                                >
                                    Continuar
                                </button>


                            </div>



                        </div>



                    ) : null}

                </div>
            </SplitScreen >
        </div >
    );

}

