import './Curso.css'
export function Curso({ course, handleSelectCourse }) {
    return (
        <div className="card cardstyle">
            <div className="row g-0">
                <div className="col-md-1 checkCol">
                    <input
                        type="checkbox"
                        name="SeleccionCurso"
                        id=""
                        className="Checkbox"
                    />
                </div>
                <div className="col-md-3 imgCurso">
                    <img
                        src="https://static.thenounproject.com/png/2161801-200.png"
                        className="img-fluid rounded-start  "
                        alt="..."
                    />
                </div>
                <div className="col-md-8 ">
                    <div className="card-body cardCurso">
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <b>Nombre del curso :</b>
                            </small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <b>Nota final :</b>
                            </small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <b>Aprobado :</b>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Curso;
