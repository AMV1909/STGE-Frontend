import { useEffect } from "react";
import toast from "react-hot-toast";

import { useUserActions } from "../../Hooks/useUserActions";
import { restoreSession } from "../../API/RestoreSession";

import "./PageLoader.css";

export function PageLoader({ setLoading }) {
    const { setUser, logoutUser } = useUserActions();

    useEffect(() => {
        if (!localStorage.getItem("token")) return setLoading(false);

        restoreSession()
            .then((user) => {
                setUser(user);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);

                if (err.response && err.response.status === 500) {
                    logoutUser();
                    return toast.error("La sesión ha expirado");
                }
            });
    }, [setLoading, setUser]);

    return (
        <main className="stge__pageLoader">
            <h1>Cargando...</h1>
            <div></div>
        </main>
    );
}
