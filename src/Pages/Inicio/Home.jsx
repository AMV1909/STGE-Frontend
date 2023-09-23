import { Navbar, SplitScreen } from '../../Components'
import './Home.css'

export function Home() {
  return (
    <div>
      <Navbar />
      <SplitScreen>
        <div className='small-column'>
          <img src="https://i0.wp.com/flejedecosas.com/wp-content/uploads/perfil-de-usuario-google-chrome-vacio.jpg?ssl=1" alt="Perfil del usuario" id='imgUsuario' />
          <div className=' datos'>
            <h5>Nombre del Estudiante</h5>
            
            <p className='dato'> <b> ID:</b> </p>
            <p className='dato'> <b> Carrera:</b> </p>
            <p className='dato'> <b> Tiempo en reunion:</b> </p>

          </div>


          <div className="row rowbuttons ">
          <button type="button" class="btn btn-light">Horarios</button>
          <button type="button" class="btn btn-light">Reuniones agendadas</button>
          <button type="button" class="btn btn-light">Reuniones realizadas</button>
          <button type="button" class="btn btn-light">Modificar asignatura a impartir</button>
          </div>
        </div>
        <div className='large-column'>
           <div className='container imgHome'>
           <img src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png" alt="UnabImg" id='UnabImg' />
           
           </div>
        
        </div>
      </SplitScreen>


    </div>
  )
}
