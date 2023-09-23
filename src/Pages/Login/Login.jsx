import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

import { useUserActions } from "../../Hooks/useUserActions";
import { googleLogin } from "../../API/Session";

/* boostrap*/
import "./Login.css";

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useUserActions();
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

    const handleGoogleLogin = async (response) => {
        if (!response.credential) {
            return toast.error("Error al iniciar sesión", { duration: 5000 });
        }

        localStorage.setItem("google-token", response.credential);

        toast.loading("Iniciando sesión...", { id: "loading", duration: 5000 });

        await googleLogin()
            .then((res) => {
                toast.dismiss("loading");

                setUser(res.data);
                localStorage.setItem("token", res.token);
                navigate("/home");

                toast.success("Sesion iniciada con éxito", { duration: 5000 });
            })
            .catch((err) => {
                toast.dismiss("loading");
                toast.error("Error al iniciar sesión", { duration: 5000 });

                if (!err.response) return toast.error(err.message);
                if (err.response.status === 404)
                    toast.error(
                        "No se encontró un usuario registrado con ese correo",
                        {
                            duration: 5000,
                        }
                    );
            });
    };

    useGoogleOneTapLogin({
        onSuccess: (response) => handleGoogleLogin(response),
        onError: () =>
            toast.error("Error al iniciar sesión", { duration: 5000 }),

        cancel_on_tap_outside: false,
    });

    return (
        <div className="container">
            <div className="image-container ">
                {/* Coloca aquí la ruta de la imagen que quieras mostrar */}
                <img
                    src="https://us.123rf.com/450wm/claudiodivizia/claudiodivizia1510/claudiodivizia151002181/46394179-vintage-buscando-papel-de-color-naranja-%C3%BAtil-como-fondo.jpg?ver=6"
                    alt="Imagen"
                />
                <div className="overlay">
                    <h1 className="titulo">UNAB</h1>
                    <p>
                        Plan padrino <br />
                        Universidad Autónoma de Bucaramanga
                    </p>
                </div>
            </div>
            <div className="login-container">
                <div className="card card1">
                    <div className="card-header">
                        <h3 className="logintext">Login</h3>

                        <div className="card-body">
                            <div id="google-login-button">
                                <GoogleLogin
                                    size="large"
                                    onSuccess={handleGoogleLogin}
                                    onError={() =>
                                        toast.error("Error al iniciar sesión", {
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
                                    onClick={() => navigate("home")}
                                >
                                    Iniciar sesión
                                </button>
                            </form>

                            <hr />
                            <div>
                                <Link to="/sign-up">Registrarse</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
