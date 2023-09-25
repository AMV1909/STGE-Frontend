
import { Navbar, Splitestudiantes, CardEstudiante, CardTutor} from '../../Components'
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

                    <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" alt="User" id='UserSeleccionado' />
                    <p><b>Nombre del estudiante</b></p>
                    <p><b>Programa</b></p>
                    <p><b>ID</b></p>
                    <p><b>Tiempo en reunión</b></p>

                    <div className=' rowUsuario'>
                       
                       <CardEstudiante/>

                    </div>
                </div>

            </div>
        </Splitestudiantes>
    </div>
    )
}
