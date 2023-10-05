import { Navbar, Splitestudiantes, CardTutor, PTutorHome } from '../../Components'
import './Home.css'

export function Home() {
  return (
    <div className='home'>
      <Navbar />
      <Splitestudiantes>
        <div className='left-column'>



          <div className="row divList ">
          

            <CardTutor/>

          </div>
        </div>
        <div className='right-columnHome'>
          <div className='imgcontainer'>
            <PTutorHome />

            <div className=' rowUsuario'>
                       
                    <button type="button" className=" btnNTutor">Nueva Tutoria</button>

                    </div>
          </div>


        </div>
      </Splitestudiantes>
    </div>
  )
}
