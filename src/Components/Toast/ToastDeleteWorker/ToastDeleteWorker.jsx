import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { deleteWorker } from "../../../API/Workers";
import { useUserActions } from "../../../Hooks/useUserActions";

import "./ToastDeleteWorker.css";

export function ToastDeleteWorker({ t, worker, fetch }) {
    const { logoutUser } = useUserActions();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteWorker(worker._id)
            .then(() => {
                toast.dismiss(t.id);
                fetch();
            })
            .catch((err) => {
                toast.dismiss(t.id);
                toast.error("Error al eliminar trabajador", {
                    duration: 5000,
                });

                if (!err.response)
                    return toast.error(err.message, { duration: 5000 });

                if (err.response.status === 500) {
                    logoutUser();
                    navigate("/login");
                    return toast.error("La sesión ha expirado");
                }
            });
    };

    return (
        <div className="stge__toastDeleteWorker">
            <p>
                ¿Está seguro que desea eliminar al trabajador{" "}
                <strong>{worker.name}</strong>?
            </p>

            <div className="stge__toastDeleteWorker-buttons">
                <button onClick={handleDelete}>Eliminar</button>

                <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
            </div>
        </div>
    );
}
