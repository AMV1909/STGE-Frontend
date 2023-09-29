import { Navbar, SplitScreen } from "../../Components";
import { useAppSelector } from "../../Hooks/store";
import "./PerfilUser.css";

export function PerfilUser() {
    const user = useAppSelector((state) => state.user);

    return (
        <div>
            <Navbar />
            <SplitScreen>
                <div className="small-column">
                    <img src={user.picture} alt={user.name} id="imgUsuario" />
                    <div className=" datos">
                        <h5>{user.name}</h5>

                        <p className="dato">
                            {" "}
                            <b> ID: {user._id}</b>{" "}
                        </p>
                        <p className="dato">
                            {" "}
                            <b> Carrera: {user.career}</b>{" "}
                        </p>
                        <p className="dato">
                            {" "}
                            <b> Tiempo en reunion: {user.meetingTime}</b>{" "}
                        </p>
                    </div>

                    <div className="row rowbuttons ">
                        {user.role === "Tutor" && (
                            <button type="button" className="btn btn-light">
                                Horarios
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button type="button" className="btn btn-light">
                                Reuniones agendadas
                            </button>
                        )}

                        {(user.role === "Tutor" || user.role === "Student") && (
                            <button type="button" className="btn btn-light">
                                Reuniones realizadas
                            </button>
                        )}

                        {user.role === "Tutor" && (
                            <button type="button" className="btn btn-light">
                                Modificar asignatura a impartir
                            </button>
                        )}
                    </div>
                </div>
                <div className="large-column">
                    <div className="container imgHome">
                        <img
                            src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png"
                            alt="UnabImg"
                            id="UnabImg"
                        />
                    </div>
                </div>
            </SplitScreen>
        </div>
    );
}
