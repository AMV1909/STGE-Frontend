import "./Navbar.css";

export function Navbar() {
    if (
        window.location.pathname === "/" ||
        window.location.pathname === "/sign-up"
    )
        return null;

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid navcolor">
                    <a className="navbar-brand" href="/home">
                        Logo Aca
                    </a>
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
                                <a
                                    className="nav-link "
                                    aria-current="page"
                                    href="/listado-estudiantes"
                                >
                                    Listado de estudiantes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Administradores
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2 search"
                                type="Buscar"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </form>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-user"
                        >
                            <i className="fa-regular fa-user"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
