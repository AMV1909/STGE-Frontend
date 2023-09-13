import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

/* boostrap*/
import "./SignUp.css";

export function SignUp() {
    const [user, setUser] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [cookies, removeCookie] = useCookies(["g_state"]);

    useEffect(() => {
        if (!google) window.location.reload();
    }, []);

    useEffect(() => {
        // Global Google
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
        });

        // Google Button
        google.accounts.id.renderButton(
            document.getElementById("google-login-button"),
            {
                theme: "outline",
                size: "large",
            }
        );

        // Google Prompt
        if (!user) {
            removeCookie("g_state");
            google.accounts.id.prompt();
        }
    }, [user, removeCookie]);

    const handleCallbackResponse = (response) => {
        localStorage.setItem("googleToken", response?.credential);
        setUser(jwtDecode(response?.credential));
    };

    const handleSignOut = () => {
        localStorage.removeItem("googleToken");
        setUser(null);
    };

    return (
        <div className="container">
            <div className="login-container">
                <div className="card card-Register">
                    <div className="card-header">
                        <h3 className="logintext">Register</h3>

                        <div className="card-body">
                            {!user && <div id="google-login-button"></div>}

                            {user && (
                                <div>
                                    <h2>User</h2>
                                    <p>{user.name}</p>
                                    <img src={user.picture} alt={user.name} />
                                    <button onClick={(e) => handleSignOut(e)}>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                            <hr />
                            <form>
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                />
                                <button type="submit">Registrarme</button>
                            </form>
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
