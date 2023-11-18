import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, CardWorker, WorkerModal } from "../../Components";
import { getWorkers } from "../../API/Workers";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useUserActions } from "../../Hooks/useUserActions";
import "./Administrar.css";

export function Administrar() {
    const [search, setSearch] = useState("");
    const [workerSelected, setWorkerSelected] = useState(null);
    const [workers, setWorkers] = useState(null);
    const { logoutUser } = useUserActions();
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("Create");
    const originalWorkers = useRef(workers);
    const navigate = useNavigate();

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

                if (err.response.status === 500) {
                    logoutUser();
                    navigate("/");
                    return toast.error("La sesión ha expirado");
                }
            });
    };

    useEffect(() => {
        document.title = "Admin - Plan Padrino";
        fetchWorkers();
    }, []);

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

                    <button
                        className="btn-AñadirT"
                        onClick={() => {
                            setShowModal(true);
                            setWorkerSelected(null);
                            setTypeModal("Create");
                        }}
                    >
                        Añadir trabajador
                    </button>
                </div>

                <div className="divMap">
                    {filteredWorkers.length !== 0 ? (
                        filteredWorkers.map((worker) => (
                            <CardWorker
                                key={worker._id}
                                worker={worker}
                                fetch={fetchWorkers}
                                setShowModal={setShowModal}
                                setTypeModal={setTypeModal}
                                setWorkerSelected={setWorkerSelected}
                            />
                        ))
                    ) : (
                        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                            No hay trabajadores
                        </h1>
                    )}
                </div>
            </div>

            {showModal && (
                <WorkerModal
                    fetch={fetchWorkers}
                    setShowModal={setShowModal}
                    type={typeModal}
                    workerSelected={workerSelected}
                />
            )}
        </>
    );
}
