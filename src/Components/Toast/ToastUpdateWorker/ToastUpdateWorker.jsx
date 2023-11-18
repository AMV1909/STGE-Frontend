import { toast } from "react-hot-toast";
import { useWorkersActions } from "../../../Hooks/useWorkerActions";
import { getWorkers } from "../../../API/Workers";
import { useState } from "react";
import { useEffect } from "react";
import { updateWorker } from "../../../API/Workers";

export function ToastUpdateWorker(worker, t) {
    const { setWorkers } = useWorkersActions();
    const [name, setName] = useState("");
    const [email, setEmail] = useState(null);
    const [picture, setPicture] = useState("");

    useEffect(() => {
        setName(worker.worker.name);
        setEmail(worker.worker.email);

        console.log(worker.worker);
    }, []);

    const handleUpdate = () => {
        toast.success("Trabajador actualizado correctamente", {
            duration: 5000,
        });
        console.log(worker.worker._id);
        updateWorker(worker.worker._id, name, email, picture)
            .then(async () => {
                toast.success("Trabajador actualizado correctamente", {
                    duration: 5000,
                });
                await getWorkers().then((response) => {
                    setWorkers(response);
                    window.location.reload();
                });
                toast.dismiss(t.id);
            })
            .catch((err) => {
                toast.error("Error al actualizar trabajador", {
                    duration: 5000,
                });
                toast.error(err.message, { duration: 5000 });
            });
    };

    const handleNombre = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePicture = (e) => {
        setPicture(e.target.files[0]);
    };

    return (
        <div className="toastUpdateWorker">
            <form className="formAddWorker">
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNombre}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    Imagen:
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handlePicture}
                    />
                </label>
            </form>
            <div className="toastUpdateWorker__buttons">
                <button className="ToastCancelar" onClick={handleUpdate}>
                    Actualizar
                </button>
                <button
                    className="EliminarWorker"
                    onClick={() => toast.dismiss(t.id)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
