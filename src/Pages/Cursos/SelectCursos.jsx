import { Navbar, Splitestudiantes } from '../../Components'
import './SelectCursos.css'

export function SelectCursos() {

    return (

        <>


            <Splitestudiantes>

                <div className='left-columnCursos'>
                    <div className='Cursos'>
                        <h1 className='tituloCursos'>Cursos</h1>

                        <p className='PGA'>Periodo acumulado (PGA) : </p>



                        <div className='Cursos-Container'>

                            <div className="card cardstyle" >
                                <div className="row g-0">

                                    <div className="col-md-1 checkCol">
                                        <input type="checkbox" name="SeleccionCurso" id="" className='Checkbox' />
                                    </div>
                                    <div className="col-md-3 imgCurso">
                                        <img src="https://static.thenounproject.com/png/2161801-200.png" className="img-fluid rounded-start  " alt="..." />
                                    </div>
                                    <div className="col-md-8 ">
                                        <div className="card-body cardCurso">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre del curso :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Nota final :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Aprobado :</b></small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="card cardstyle" >
                                <div className="row g-0">

                                    <div className="col-md-1 checkCol">
                                        <input type="checkbox" name="SeleccionCurso" id="" className='Checkbox' />
                                    </div>
                                    <div className="col-md-3 imgCurso">
                                        <img src="https://static.thenounproject.com/png/2161801-200.png" className="img-fluid rounded-start  " alt="..." />
                                    </div>
                                    <div className="col-md-8 ">
                                        <div className="card-body cardCurso">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre del curso :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Nota final :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Aprobado :</b></small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card cardstyle" >
                                <div className="row g-0">

                                    <div className="col-md-1 checkCol">
                                        <input type="checkbox" name="SeleccionCurso" id="" className='Checkbox' />
                                    </div>

                                    <div className="col-md-3 imgCurso ">
                                        <img src="https://static.thenounproject.com/png/2161801-200.png" className="img-fluid rounded-start  " alt="..." />
                                    </div>
                                    <div className="col-md-8 ">
                                        <div className="card-body cardCurso">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre del curso :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Nota final :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Aprobado :</b></small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="card cardstyle" >
                                <div className="row g-0">

                                    <div className="col-md-1 checkCol">
                                        <input type="checkbox" name="SeleccionCurso" id="" className='Checkbox' />
                                    </div>


                                    <div className="col-md-3 imgCurso ">
                                        <img src="https://static.thenounproject.com/png/2161801-200.png" className="img-fluid rounded-start  " alt="..." />
                                    </div>
                                    <div className="col-md-8 ">
                                        <div className="card-body cardCurso">
                                            <p className="card-text"><small className="text-body-secondary"><b>Nombre del curso :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Nota final :</b></small></p>
                                            <p className="card-text"><small className="text-body-secondary"><b>Aprobado :</b></small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button type="button" class=" btnCurso">Iniciar sesion</button>

                    </div>
                </div>

                <div className='right-column Textdiv'>
                    <div className="textside">
                        <h1 className="titulo1">¿Que enseñaras?</h1>
                        <p className='text'>
                            <br />
                            Seleccionar los cursor que quieres enseñar
                        </p>
                    </div>


                </div>
            </Splitestudiantes>
        </>



    )
}