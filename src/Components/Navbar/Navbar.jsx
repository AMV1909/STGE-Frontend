import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { searchTutors } from "../../API/Tutors";
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { toast } from "react-hot-toast";

export function Navbar() {
    const navigate = useNavigate();
    const { setSearchingTutors, resetTutors } = useTutorsActions();
    const [data, setData] = useState({
        type_search: "course",
        search: "",
    });

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.search === "") return;

        navigate("/home");

        await searchTutors(data)
            .then((tutors) => setSearchingTutors(tutors))
            .catch((err) => {
                toast.error("Error al buscar tutores", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid navcolor">
                    <Link
                        className="navbar-brand"
                        to="/home"
                        onClick={() => resetTutors()}
                    >

                        <i class="fa-solid fa-book-open" id="logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/lista-estudiantes"
                                >
                                    Listado de estudiantes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    Administradores
                                </Link>
                            </li>
                        </ul>

                        <form
                            className="d-flex"
                            role="search"
                            onSubmit={handleSubmit}
                        >
                            <select
                                className="form-select"
                                name="type_search"
                                id="Filtro"
                                onChange={onChange}
                            >
                                <option className="options" value="course">
                                    Cursos
                                </option>
                                <option className="options" value="name">
                                    Tutores
                                </option>
                            </select>

                            <input
                                className="form-control me-2 search"
                                placeholder={`Buscar por ${data.type_search === "name"
                                    ? "tutor"
                                    : "curso"
                                    }`}
                                aria-label="Search"
                                name="search"
                                onChange={onChange}
                            />
                        </form>

                        <div className="dropdown">
                            <button
                                className="btn  dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i class="fa-solid fa-bell iconbell"></i>
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <h5 style={
                                    {
                                        color: "black",
                                        padding: "10px",
                                        textAlign: "center"
                                    }
                                }>Notificaciones</h5>
                                <hr />

                            </ul>
                        </div>


                        <div className="dropdown DropdownProfile">
                            <button
                                className="btn  "
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i class="fa-solid fa-user iconbell"></i>
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li>
                                    <Link
                                        className="dropdown-Profile"
                                        to="/perfil"
                                    >
                                        Mi perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-Profile"
                                        to="/"
                                    >
                                        Cerrar sesión
                                    </Link>
                                </li>
                            </ul>

                            </div>

                        

                    </div>
                </div>
            </nav>
        </div>
    );
}
