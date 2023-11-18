import { useMemo, useRef, useState } from "react";
import { Navbar, CardWorker } from "../../Components";
import { getWorkers } from "../../API/Workers";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { ToastAgregarWorker } from "../../Components/Toast/ToastAgregarWorker/ToastAgregarWorker";
import { useAppSelector } from "../../Hooks/store";
import { useWorkersActions } from "../../Hooks/useWorkerActions";
import "./Administrar.css";

export function Administrar() {
    const [search, setSearch] = useState("");
    const workers = useAppSelector((state) => state.workers);
    const { setWorkers } = useWorkersActions();
    const originalWorkers = useRef(workers);

    const fetchWorkers = async () => {
        getWorkers()
            .then((response) => {
                setWorkers(response);
                originalWorkers.current = response;
            })
            .catch((err) => {
                toast.error("Error al obtener trabajadores", {
                    duration: 5000,
                });
                toast.error(err.message, { duration: 5000 });
            });
    };

    useEffect(() => {
        if (workers.length === 0 || workers[0]._id !== "") return;
        fetchWorkers();
    }, [workers]);

    const addWorker = () => {
        toast((t) => <ToastAgregarWorker t={t} fetchWorkers={fetchWorkers} />, {
            duration: 100000,
        });
    };

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredWorkers = useMemo(() => {
        if (workers === null) return [];

        if (search === "") return originalWorkers.current;

        return workers.filter((worker) => {
            return (
                worker.name.toLowerCase().includes(search.toLowerCase()) ||
                worker.email.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, workers]);

    return (
        <>
            <Navbar />

            <div className="divWorker">
                <div className="AñadirT">
                    <input type="search" name="search" onChange={onChange} />

                    <button className="btn-AñadirT " onClick={addWorker}>
                        Añadir trabajador
                    </button>
                </div>

                <div className="divMap">
                    {filteredWorkers.map((worker) => (
                        <CardWorker
                            key={worker._id}
                            _id={worker._id}
                            name={worker.name}
                            email={worker.email}
                            picture={worker.picture}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
