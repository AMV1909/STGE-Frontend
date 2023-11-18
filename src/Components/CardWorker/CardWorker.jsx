import { toast } from "react-hot-toast";
import { ToastDeleteWorker } from "../Toast/ToastDeleteWorker/ToastDeleteWorker";
import { ToastUpdateWorker } from "../Toast/ToastUpdateWorker/ToastUpdateWorker";

import "./CardWorker.css";

export function CardWorker(worker) {
    const onClick = (name, id) => {
        toast((t) => <ToastDeleteWorker t={t} name={name} id={id} />, {
            duration: 5000,
        });
    };

    const updateWorker = (worker) => {
        toast((t) => <ToastUpdateWorker t={t} worker={worker} />, {
            duration: 100000,
        });
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
                                className="btn-eliminar "
                                onClick={() => onClick(worker.name, worker._id)}
                            >
                                Eliminar
                            </button>
                            <button
                                className="btn-actualizar "
                                onClick={() => updateWorker(worker)}
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
