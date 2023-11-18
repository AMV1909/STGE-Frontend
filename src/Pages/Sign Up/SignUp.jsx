import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

/* boostrap*/
import "./SignUp.css";
import { ToastRegistro } from "../../Components/Toast/Toast Registro/ToastRegistro";
import { Splitestudiantes } from "../../Components";

export function SignUp() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        document.title = "Registro - Plan Padrino";
    }, []);

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
        if (!response) {
            return toast.error("Error al registrarse", { duration: 5000 });
        }

        localStorage.setItem("google-token", response.access_token);

        toast((t) => <ToastRegistro t={t} />, { duration: Infinity });
    };

    const googleRegisterHook = useGoogleLogin({
        flow: "implicit",
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send",
        onSuccess: handleGoogleRegister,
        onError: () =>
            toast.error("Error al registrarse", {
                duration: 5000,
            }),
    });

    return (
        <Splitestudiantes>
            <div className="login-container left-columnSignUp">
                <div className="card cardLog card-Register">
                    <div className="card-header">
                        <h3 className="logintext">Register</h3>

                        <div className="card-body">
                            <div id="google-register-button">
                                <button
                                    type="button"
                                    onClick={() => googleRegisterHook()}
                                >
                                    Registrarse con Google 🚀
                                </button>
                            </div>

                            <hr />
                            <form onSubmit={handleSubmit} className="login">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    onChange={onChange}
                                    required
                                    autoComplete="off"
                                    disabled
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={onChange}
                                    required
                                    autoComplete="off"
                                    disabled
                                />

                                <button
                                    type="submit"
                                    onClick={() =>
                                        toast(<ToastRegistro />, {
                                            duration: 1000000,
                                        })
                                    }
                                    disabled
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

            <div className="right-columnSignUp ">
                <div className="overlay-Register">
                    <h1 className="titulo">UNAB</h1>
                    <p>
                        Plan padrino <br />
                        Universidad Autónoma de Bucaramanga
                    </p>
                </div>
            </div>
        </Splitestudiantes>
    );
}
