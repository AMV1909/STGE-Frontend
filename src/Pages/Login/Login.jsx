import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

import "./Login.css";

export function Login() {
    const [user, setUser] = useState(null);
    
    // eslint-disable-next-line no-unused-vars
    const [cookies, removeCookie] = useCookies(["g_state"]);

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
        <div>
            <h1>Google Login</h1>
            {!user && <div id="google-login-button"></div>}

            {user && (
                <div>
                    <h2>User</h2>
                    <p>{user.name}</p>
                    <img src={user.picture} alt={user.name} />
                    <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                </div>
            )}
        </div>
    );
}
