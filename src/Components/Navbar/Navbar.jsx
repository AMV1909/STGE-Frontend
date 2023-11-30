import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchTutors } from "../../API/Tutors";
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { toast } from "react-hot-toast";
import { useUserActions } from "../../Hooks/useUserActions";
import { getNotifications } from "../../API/Notifications";
import { useAppSelector } from "../../Hooks/store";
import "./Navbar.css";

export function Navbar() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const { logoutUser } = useUserActions();
    const { setSearchingTutors, resetTutors } = useTutorsActions();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [data, setData] = useState({
        type_search: "course",
        search: "",
    });

    const [isMobile, setIsMobile] = useState(false);

    const fetchNotifications = async () => {
        await getNotifications()
            .then((notifications) => {
                console.log(notifications);
                setNotifications(notifications);
            })
            .catch((err) => {
                toast.error("Error al obtener notificaciones", {
                    duration: 5000,
                });

                if (!err.response)
                    return toast.error(err.message, { duration: 5000 });

                if (err.response.status === 500) {
                    logoutUser();
                    navigate("/");
                    return toast.error("La sesión ha expirado");
                }
            });
    };

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

    useEffect(() => {
        if (showNotifications) {
            fetchNotifications();
        }
    }, [showNotifications]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 980);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid navcolor">
                    <Link
                        aria-label="Home"
                        className="navbar-brand"
                        to="/home"
                        onClick={() => resetTutors()}
                    >
                        <img
                            id="logo"
                            src=" https://i.postimg.cc/ncZBSyS5/logito.png"
                            alt=""
                        />
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
                        {(user.role === "Worker" || user.role === "Admin") && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {(user.role === "Worker" ||
                                    user.role === "Admin") && (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link "
                                            aria-current="page"
                                            to="/lista-estudiantes"
                                        >
                                            Listado de estudiantes
                                        </Link>
                                    </li>
                                )}
                                {user.role === "Admin" && (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to="/administrar"
                                        >
                                            Administradores
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        )}

                        <form
                            className="d-flex"
                            role="search"
                            onSubmit={handleSubmit}
                        >
                            <select
                                aria-label="Type search"
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
                                placeholder={`Buscar por ${
                                    data.type_search === "name"
                                        ? "tutor"
                                        : "curso"
                                }`}
                                aria-label="Search"
                                name="search"
                                onChange={onChange}
                            />
                        </form>
                        <div className="content">
                            <div className="dropdown">
                                <button
                                    onClick={() =>
                                        setShowNotifications(!showNotifications)
                                    }
                                    className="btn  dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    aria-label="Toggle notification"
                                >
                                    <i className="fa-solid fa-bell iconbell"></i>
                                </button>
                                <ul
                                    className={`dropdown-menu  ${
                                        !isMobile ? "dropdown-menu-end" : ""
                                    }`}
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <h5
                                        style={{
                                            color: "black",
                                            padding: "10px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Notificaciones
                                    </h5>
                                    <hr />

                                    {notifications.map(
                                        (notification, index) => (
                                            <p
                                                className="notification-text"
                                                key={index}
                                            >
                                                {notification.content}
                                            </p>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className="dropdown DropdownProfile">
                                <button
                                    className="btn  "
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    aria-label="Toggle profile"
                                >
                                    <i className="fa-solid fa-user iconbell"></i>
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <button
                                            className="dropdown-Profile btn"
                                            onClick={() => navigate("/perfil")}
                                        >
                                            Mi perfil
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-Profile btn"
                                            onClick={() => logoutUser()}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
