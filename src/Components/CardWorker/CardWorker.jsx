import { toast } from "react-hot-toast";
import { ToastDeleteWorker } from "../Toast/ToastDeleteWorker/ToastDeleteWorker";
import "./CardWorker.css";

export function CardWorker({
    worker,
    fetch,
    setShowModal,
    setTypeModal,
    setWorkerSelected,
}) {
    const handleEdit = () => {
        setTypeModal("Update");
        setWorkerSelected(worker);
        setShowModal(true);
    };

    const handleDelete = async () => {
        toast(
            (t) => <ToastDeleteWorker t={t} worker={worker} fetch={fetch} />,
            {
                duration: 5000,
            }
        );
    };

    return (
        <>
            <div className="cardW">
                <div key={worker._id} className=" head cardT">
                    <div className="row g-0">
                        <div className="col-md-3 imgWorkerdiv">
                            <img
                                src={worker.picture}
                                className="img-fluid rounded-start imgUser "
                                alt="..."
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="card-body Workerpart">
                                <h5 className="card-title">{worker.name}</h5>
                                <p className="card-text">
                                    Email: {worker.email}
                                </p>
                            </div>
                        </div>

                        <div className="col crud">
                            <button
                                className="btn-eliminar"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                            <button
                                className="btn-actualizar"
                                onClick={handleEdit}
                            >
                                Acutalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
