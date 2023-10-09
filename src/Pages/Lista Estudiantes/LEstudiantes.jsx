
import { useState } from 'react';
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome} from '../../Components'
import './LEstudiantes.css'


  

export function LEstudiantes() {

    const [tutorSeleccionado, setTutorSeleccionado] = useState(null);

    const handleCardClick = (tutor) => {
      setTutorSeleccionado(tutor);
    };
    
  
    return (
        <>
        <Navbar />
        <Splitestudiantes>
            <div className='left-column'>



                <div className="row divList ">

                   <CardTutor
                    onCardClick={handleCardClick}
                   />

                </div>
            </div>
            <div className='right-column'>
                <div className='imgcontainer1'>

                   <PTutorHome
                   tutor={tutorSeleccionado}
                   />

                    <div className=' rowUsuario'>
                       
                       <CardEstudiante/>

                    </div>
                </div>

            </div>
        </Splitestudiantes>
    </>
    )
}
