import "./CardEstudiante.css";

export function CardEstudiante(tutorSelected) {

    return (
        <>
            <div   
            key={tutorSelected.events._id}
             
            className="card cardE"
             >
                <div className="row ">
                    <div className="col-md-3 ">
                        <img src={tutorSelected.events.student.picture} className="img-fluid rounded-start  " alt="..." />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card-body cardUser">
                            <p className="card-text"><small className="text-body-secondary"><b>{tutorSelected.events.student.name}</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>{tutorSelected.events.email}</b></small></p>
                            <p className="card-text"><small className="text-body-secondary"><b>{tutorSelected.events.student.id}</b></small></p>
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