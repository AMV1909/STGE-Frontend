
import { useState } from 'react';
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome } from '../../Components'
import './LEstudiantes.css'




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
          <div className='imgcontainer1'>

            <PTutorHome
              tutor={tutorSeleccionado}
            />
            <button type="button" className=" btn btnAtras btn-link" onClick={resetColumnaDerecha}>Atras</button>
            < div className=' rowUsuario'>


              <CardEstudiante />

            </div>
          </div>

        </div>
      </Splitestudiantes>
    </>
  )
}
