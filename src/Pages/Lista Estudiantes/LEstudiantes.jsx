
import { useEffect, useState } from 'react';
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome } from '../../Components'
import { useWorkersActions } from '../../Hooks/useWorkerActions';
import { useAppSelector } from '../../Hooks/store';
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { getTutorWorker } from '../../API/Tutors';

import './LEstudiantes.css'
import toast from 'react-hot-toast';





export function LEstudiantes() {

  const [mostrarColumnaDerecha, setMostrarColumnaDerecha] = useState(false);
  

  const toggleColumnaDerecha = () => {
    if (window.innerWidth <= 768) {
      setMostrarColumnaDerecha(!mostrarColumnaDerecha);
    }
  };

  const resetColumnaDerecha = () => {
    setMostrarColumnaDerecha(false);
  };


  const [tutorSeleccionado, setTutorSeleccionado] = useState(null);

  const handleCardClick = (tutor) => {
    setTutorSeleccionado(tutor);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMostrarColumnaDerecha(false);
      }


    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };


  }, []);


  
 
  const { setTutors } = useTutorsActions();
  const tutors = useAppSelector((state) => state.tutors);

  useEffect(() => {
    if (tutors.length === 0 || tutors[0]._id !== "") return;

    getTutorWorker()
      .then((response) => {
        setTutors(response);
        console.log(response);
      })
      .catch((err) => {
        toast.error("Error al obtener tutores", { duration: 5000 });
        toast.error(err.message, { duration: 5000 });
      });
  }, [setTutors, tutors]);


  return (
    <>
      <Navbar />
      <Splitestudiantes>
        <div className={`left-column ${mostrarColumnaDerecha ? 'columna-izquierda-oculta' : ''}`}>



          <div className="row divList ">
                   
                  {
                    
                    tutors.map((tutor) => (
                     
                        <CardTutor
                          tutor={tutor}
                          onCardClick={handleCardClick}
                          onToggleClick={toggleColumnaDerecha}

                        />
                    
                    ))
                  }
                   


            <div className="col-sm-4">

             
            </div>



          </div>
        </div>
        <div className={`right-columnHome${mostrarColumnaDerecha ? 'columna-derecha-visible' : ''}`}>
          <div className='imgcontainer'>

            <PTutorHome
              tutor={tutorSeleccionado}
            />

            <button type="button" className=" btn btnAtras btn-link" onClick={resetColumnaDerecha}>Atras</button>
            < div className=' rowUsuario'>

               


            </div>
          </div>

        </div>
      </Splitestudiantes>
    </>
  )
}
