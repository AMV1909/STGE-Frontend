
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome} from '../../Components'
import './LEstudiantes.css'


  

export function LEstudiantes() {
    return (
        <>
        <Navbar />
        <Splitestudiantes>
            <div className='left-column'>



                <div className="row divList ">

                   <CardTutor/>

                </div>
            </div>
            <div className='right-column'>
                <div className='imgcontainer1'>

                   <PTutorHome/>

                    <div className=' rowUsuario'>
                       
                       <CardEstudiante/>

                    </div>
                </div>

            </div>
        </Splitestudiantes>
    </>
    )
}
