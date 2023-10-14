import { useState } from 'react';
import { Navbar, Splitestudiantes, CardTutor, PTutorHome } from '../../Components'
import './Home.css'

export function Home() {

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
    <div className='home'>
      <Navbar />
      <Splitestudiantes>
        <div className={`left-column ${mostrarColumnaDerecha ? 'columna-izquierda-oculta' :  ''}`}>



          <div className="row divList ">

                  <CardTutor  
                    onCardClick={
                      handleCardClick}
                    onToggleClick={toggleColumnaDerecha}
                     
                  />

          </div>
        </div>
        <div className={`right-columnHome${mostrarColumnaDerecha ? 'columna-derecha-visible' : ''}`}>
          <div className='imgcontainer'>
            
            
            <PTutorHome tutor={tutorSeleccionado}/>

            <div className=' rowUsuario'>
                       
                    <button type="button" className=" btnNTutor">Nueva Tutoria</button>
                    <br />
                    <button type="button" className=" btn btnAtras btn-link" onClick={ resetColumnaDerecha }>Atras</button>

                    </div>
          </div>


        </div>
      </Splitestudiantes>
    </div>
  )
}
