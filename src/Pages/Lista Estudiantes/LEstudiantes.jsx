
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor, PTutorHome} from '../../Components'
import './LEstudiantes.css'


  

export function LEstudiantes() {
    return (
        <div>
        <Navbar />
        <Splitestudiantes>
            <div className='left-column'>



                <div className="row divList ">

                   <CardTutor/>

                </div>
            </div>
            <div className='right-column'>
                <div className='imgcontainer'>

                   <PTutorHome/>

                    <div className=' rowUsuario'>
                       
                       <CardEstudiante/>

                    </div>
                </div>

            </div>
        </Splitestudiantes>
    </div>
    )
}
