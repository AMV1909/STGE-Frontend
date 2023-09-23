import ReactStars from "react-rating-stars-component";
import { Navbar, Splitestudiantes } from '../../Components'
import './LEstudiantes.css'

const ratingChanged = (newRating) => {
    console.log(newRating);
  };
    document.getElementById("where-to-render")
  

export function LEstudiantes() {
    return (
        <div>
            <Navbar />
            <Splitestudiantes>
                <div className='left-column'>



                    <div className="row divList ">

                        <div className="card head" >
                            <div className="row g-0">
                                <div className="col-md-3 imgUserdiv">
                                    <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start imgUser " alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body cardUser">
                                        <p className="card-nombre"><b>Nombre:</b></p>
                                        <p className="card-text programa"><b>Programa:</b></p>
                    
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />

                                    
                                    
                                    </div>
                                </div>
                            </div>
                        </div>

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
                            <div className="card head" >
                                <div className="row User g-0">
                                    <div className="col-md-3 Userdiv">
                                        <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start imgUser " alt="..." />
                                    </div>
                                
                                
                                    <div className="col-md-8 seleccionado">
                                        <div className="card-body cardUser">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Programa</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Tiempo de reunión</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Fecha</b></small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="card head" >
                                <div className="row User g-0">
                                    <div className="col-md-3 Userdiv">
                                        <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start imgUser " alt="..." />
                                    </div>
                                    <div className="col-md-8 seleccionado">
                                        <div className="card-body cardUser">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Programa</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Tiempo de reunión</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Fecha de reunión</b></small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Splitestudiantes>
        </div>
    )
}
