import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

import { useTempUserActions } from "../../Hooks/useTempUserActions";
import { getUserData } from "../../API/Session";

/* boostrap*/
import "./SignUp.css";

export function SignUp() {
    const navigate = useNavigate();
    const { setTempUser } = useTempUserActions();
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

        toast.loading("Obteniendo información...", {
            id: "loading",
            duration: 5000,
        });

        await getUserData()
            .then((res) => {
                toast.dismiss("loading");

                res.courses.forEach((course) => {
                    return (course.grade = Number(course.grade));
                });

                setTempUser(res);
                navigate("/select-cursos");

                toast.success("Bienvenido", { duration: 5000 });
                toast.success(
                    "Por favor, seleccione los cursos que desea registrar",
                    {
                        duration: 5000,
                    }
                );
            })
            .catch((err) => {
                toast.dismiss("loading");
                toast.error("Error al registrarse", { duration: 5000 });

                if (err.response?.status === 405) {
                    return toast.error("Ya existe una cuenta con este correo", {
                        duration: 5000,
                    });
                }

                toast.error(err.message, { duration: 5000 });
            });
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

                                <button type="submit">Registrarme</button>
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
