import { useEffect } from "react";

import { useUserActions } from "../../Hooks/useUserActions";
import { restoreSession } from "../../API/RestoreSession";

import "./PageLoader.css";

export function PageLoader({ setLoading }) {
    const { setUser } = useUserActions();

    useEffect(() => {
        if (!localStorage.getItem("token")) return setLoading(false);

        restoreSession()
            .then((user) => {
                setUser(user);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setLoading(false);
            });
    }, [setLoading, setUser]);

    return (
        <main className="stge__pageLoader">
            <h1>Cargando...</h1>
            <div></div>
        </main>
    );
}
