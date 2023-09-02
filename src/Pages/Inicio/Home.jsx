import React from 'react'
import { Navbar } from '../../Components/Navbar/Navbar'
import SplitScreen from '../../Components/Split/SplitScreen'
import './Home.css'

export  function Home() {
  return (
    <div>
        <Navbar />
        <SplitScreen>
      <div className='small-column'>
        Perfil Estudiante
      </div>
      <div className='large-column'>
          Imagen Unab u Horarios
      </div>
    </SplitScreen>
            
        
    </div>
  )
}
