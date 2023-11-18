import "./Curso.css";

export function Curso({ course, handleSelectCourse, selected = false }) {
    return (
        <div className="card cardstyle">
            <div className="row g-0 rowCur">
                <div className="col-md-1 checkCol">
                    <input
                        style={
                            course.grade >= 3.8
                                ? {}
                                : { appearance: "none", cursor: "auto" }
                        }
                        type="checkbox"
                        name="SeleccionCurso"
                        id={course.nrc}
                        className="Checkbox"
                        onClick={() =>
                            course.grade >= 3.8 && handleSelectCourse(course)
                        }
                        defaultChecked={selected}
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
                                <b>Nombre del curso : {course.name}</b>
                            </small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <b>Nota final : </b>
                                <b
                                    style={
                                        course.grade >= 3.8
                                            ? { color: "#1E8449" }
                                            : { color: "#C0392B" }
                                    }
                                >
                                    {course.grade}
                                </b>
                            </small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <b>Aprobado :</b>
                                <b
                                    style={
                                        course.grade >= 3.8
                                            ? { color: "#1E8449" }
                                            : { color: "#C0392B" }
                                    }
                                >
                                    {" "}
                                    {course.grade >= 3.8 ? "Sí" : "No"}
                                </b>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Curso;
