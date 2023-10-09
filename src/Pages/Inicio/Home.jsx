import { useState } from 'react';
import { Navbar, Splitestudiantes, CardTutor, PTutorHome } from '../../Components'
import './Home.css'

export function Home() {
 
  const [tutorSeleccionado, setTutorSeleccionado] = useState(null);

  const handleCardClick = (tutor) => {
    setTutorSeleccionado(tutor);
  };

  return (
    <div className='home'>
      <Navbar />
      <Splitestudiantes>
        <div className='left-column'>



          <div className="row divList ">

                  <CardTutor  
                    onCardClick={handleCardClick}
                  />

          </div>
        </div>
        <div className='right-columnHome'>
          <div className='imgcontainer'>
            
            <PTutorHome tutor={tutorSeleccionado}/>

            <div className=' rowUsuario'>
                       
                    <button type="button" className=" btnNTutor">Nueva Tutoria</button>

                    </div>
          </div>


        </div>
      </Splitestudiantes>
    </div>
  )
}
