import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

/* boostrap*/
import "./SignUp.css";
import { ToastRegistro } from "../../Components/Toast Registro/ToastRegistro";

export function SignUp() {
    const [, removeCookie] = useCookies(["g_state"]);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        removeCookie("g_state", []);
    }, [removeCookie]);

    const onChange = (e) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleGoogleRegister = async (response) => {
        if (!response.credential) {
            return toast.error("Error al registrarse", { duration: 5000 });
        }

        localStorage.setItem("google-token", response.credential);

        toast((t) => <ToastRegistro t={t} />, { duration: Infinity });
    };

    useGoogleOneTapLogin({
        onSuccess: (response) => handleGoogleRegister(response),
        onError: () => toast.error("Error al registrarse", { duration: 5000 }),

        cancel_on_tap_outside: false,
    });

    return (
        <div className="container">
            <div className="login-container">
                <div className="card card-Register">
                    <div className="card-header">
                        <h3 className="logintext">Register</h3>

                        <div className="card-body">
                            <div id="google-login-button">
                                <GoogleLogin
                                    size="large"
                                    onSuccess={handleGoogleRegister}
                                    onError={() =>
                                        toast.error("Error al registrarse", {
                                            duration: 5000,
                                        })
                                    }
                                />
                            </div>

                            <hr />
                            <form onSubmit={handleSubmit} className="login">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={onChange}
                                    required
                                />

                                <button
                                    type="submit"
                                    onClick={() =>
                                        toast(<ToastRegistro />, {
                                            duration: 1000000,
                                        })
                                    }
                                >
                                    Registrarme
                                </button>
                            </form>

                            <hr />
                            <div>
                                <Link to="/">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="image-container ">
                {/* Coloca aquí la ruta de la imagen que quieras mostrar */}
                <img
                    src="https://us.123rf.com/450wm/claudiodivizia/claudiodivizia1510/claudiodivizia151002181/46394179-vintage-buscando-papel-de-color-naranja-%C3%BAtil-como-fondo.jpg?ver=6"
                    alt="Imagen"
                />
                <div className="overlay-Register">
                    <h1 className="titulo">UNAB</h1>
                    <p>
                        Plan padrino <br />
                        Universidad Autónoma de Bucaramanga
                    </p>
                </div>
            </div>
        </div>
    );
}
