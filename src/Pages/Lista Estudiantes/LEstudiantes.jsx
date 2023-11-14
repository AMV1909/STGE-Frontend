
import { useEffect, useState } from 'react';
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome } from '../../Components'
import './LEstudiantes.css'
import { useAppSelector } from '../../Hooks/store';
import { getTutorWorker } from '../../API/Tutors';




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

  useEffect(() => {
    if (!tutorSeleccionado) return;

    getTutorWorker(tutorSeleccionado._id)
      .then((response) => {
        setTutorSeleccionado(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tutorSeleccionado]);

   
  return (
    <>
      <Navbar />
      <Splitestudiantes>
        <div className={`left-column ${mostrarColumnaDerecha ? 'columna-izquierda-oculta' : ''}`}>



          <div className="row divList ">

            <CardTutor
              onCardClick={handleCardClick}
              onToggleClick={toggleColumnaDerecha}
            />

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
