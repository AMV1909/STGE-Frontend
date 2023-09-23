import { Splitestudiantes } from '../../Components'
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

                            

                        </div>

                        <button type="button" className=" btnCurso">Iniciar sesion</button>

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