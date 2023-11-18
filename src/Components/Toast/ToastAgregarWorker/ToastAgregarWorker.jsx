import { useState } from "react";
import { toast } from "react-hot-toast";
import { setWorker, getWorkers } from "../../../API/Workers";
import { useWorkersActions } from "../../../Hooks/useWorkerActions";

import "./ToastAgregarWorker.css";

export function ToastAgregarWorker(t) {
    const { setWorkers } = useWorkersActions();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState("");

    const handleNombre = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePicture = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = () => {
            setPictureUrl(reader.result);
        };

        setPicture(e.target.files[0]);
    };

    const deletePicture = () => {
        setPictureUrl("");
        setPicture("");
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        toast.dismiss(t.id);
        toast.loading("Agregando trabajador...", { id: "loading" });

        setWorker(name, email, picture)
            .then(async () => {
                toast.dismiss("loading");
                toast.success("Trabajador agregado correctamente", {
                    duration: 5000,
                });

                await getWorkers().then((response) => {
                    setWorkers(response);
                    window.location.reload();
                });
            })
            .catch((err) => {
                toast.error("Error al agregar trabajador", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
                console.log(err);
            });
    };

    return (
        <div>
            <form className="formAddWorker" onSubmit={enviarFormulario}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNombre}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        required
                    />
                </label>
                <label htmlFor="imagen">
                    Imagen:
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handlePicture}
                        onClick={deletePicture}
                        required
                    />
                </label>
                {pictureUrl ? (
                    <img
                        className="prevewImage"
                        src={pictureUrl}
                        alt="Imagen"
                    />
                ) : (
                    <p>Imagen no seleccionada</p>
                )}
                <div className="btnAgregarWorker">
                    <button type="submit" className="ToastCancelar">
                        Añadir Trabajador
                    </button>

                    <button
                        type="button"
                        className="EliminarWorker"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
