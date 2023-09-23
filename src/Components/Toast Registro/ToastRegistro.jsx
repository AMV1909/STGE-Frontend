import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast'
import './ToastRegistro.css';
import { useState } from "react";


export function ToastRegistro() {

    const [esEstudiante, setEsEstudiante] = useState(false);
    const [esTutor, setEsTutor] = useState(false);

    const handleEstudianteChange = () => {
        setEsEstudiante(!esEstudiante);
        setEsTutor(false);
    };

    const handleTutorChange = () => {
        setEsTutor(!esTutor);
        setEsEstudiante(false);
    };

    return (

        <div className="divtoast">


            <h5>Seleciona tu rol para continuar {'\n'}</h5>


            <form action=" ">

                <div className=" toastform">
                    <label className="tutorLabel"> <input
                        type="checkbox"
                        checked={esTutor}
                        onChange={handleTutorChange}
                    >
                    </input>
                        Tutor
                    </label>
                    <label className="estudianteLabel">
                        <input
                            type="checkbox"
                            checked={esEstudiante}
                            onChange={handleEstudianteChange}
                        >
                        </input>
                        Estudiante

                    </label>
                    <br />




                </div>
                <div className="divSeleccion">
                    Selección: {esEstudiante ? 'Estudiante' : ''} {esTutor ? 'Tutor' : ''}
                </div>

                <button className="btnToast">Continuar</button>
            </form>






        </div>
    )
}