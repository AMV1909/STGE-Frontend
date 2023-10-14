import "./CardEstudiante.css";

export function CardEstudiante() {

    return (
        <>
            <div className="card cardE" >
                <div className="row ">
                    <div className="col-md-3 ">
                        <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start  " alt="..." />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card-body cardUser">
                            <p className="card-text"><small className="text-body-secondary"><b>Nombre</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Programa</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Tiempo de reunión</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Fecha de reunión</b></small></p>
                        </div>
                    </div>
                </div>

            </div>

           

            <div className="card cardE" >
                <div className="row ">
                    <div className="col-md-3 ">
                        <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start  " alt="..." />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card-body cardUser">
                            <p className="card-text"><small className="text-body-secondary"><b>Nombre</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Programa</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Tiempo de reunión</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>Fecha de reunión</b></small></p>
                        </div>
                    </div>
                </div>

            </div>




        </>

    )
}

export default CardEstudiante;