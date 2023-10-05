import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Hooks/store";

export function ProtectedRoute({ children }) {
    const user = useAppSelector((state) => state.user);
    const tempUser = useAppSelector((state) => state.tempUser);

    switch (window.location.pathname) {
        case "/home": {
            if (user._id === "" || user._id === undefined)
                return <Navigate to="/" />;
            break;
        }

        case "/": {
            if (user._id !== "" && user._id !== undefined)
                return <Navigate to="/home" />;
            break;
        }

        case "/sign-up": {
            if (user._id !== "" && user._id !== undefined)
                return <Navigate to="/home" />;
            break;
        }

        case "/select-cursos": {
            if (tempUser.id === "") return <Navigate to="/sign-up" />;
            break;
        }

        // case PathRoutes.TutorsList:

        // case PathRoutes.Admin:

        case "/perfil": {
            if (user._id === "" || user._id === undefined)
                return <Navigate to="/" />;
            break;
        }

        default:
            break;
    }

    return children;
}
