import React from 'react'
import { Navbar } from '../../Components/Navbar/Navbar'
import Splitestudiantes from '../../Components/SplitE/splitestudiantes'
import './LEstudiantes.css'

export function LEstudiantes() {
    return (
        <div>
            <Navbar />
            <Splitestudiantes>
                <div className='left-column'>



                    <div className="row divList ">

                        <div class="card head" >
                            <div class="row g-0">
                                <div class="col-md-3 imgUserdiv">
                                    <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start imgUser " alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body cardUser">
                                        <p class="card-nombre"><b>Nombre</b></p>
                                        <p class="card-text"><b>Programa</b></p>
                                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='right-column'>
                    <div className='container imgcontainer'>
                        <img src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png" alt="UnabImg" id='UnabImg' />

                    </div>

                </div>
            </Splitestudiantes>
        </div>
    )
}
