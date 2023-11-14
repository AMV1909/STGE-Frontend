

import { getWorkers, deleteWorker } from '../../API/Workers'
import { toast } from 'react-hot-toast'
import { useWorkersActions } from '../../Hooks/useWorkerActions'
import { useAppSelector } from '../../Hooks/store'
import { ToastDeleteWorker } from '../Toast/ToastDeleteWorker/ToastDeleteWorker'
import { ToastAgregarWorker } from '../Toast/ToastAgregarWorker/ToastAgregarWorker'
import React, { useEffect } from 'react'

import './CardWorker.css'

export function CardWorker ()  {
    const worker = useAppSelector((state) => state.workers);
    const { setWorkers } = useWorkersActions();
    const workers = useAppSelector((state) => state.workers);

    useEffect(() => {
        if (workers.length === 0 || workers[0]._id !== "") return;

        getWorkers()
            .then((response) => {
                setWorkers(response);
            })
            .catch((err) => {
                toast.error("Error al obtener trabajadores", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
            });
    }, [setWorkers, workers]);

     
    const onClick = (name, id) => {
        toast((t) => 
        <ToastDeleteWorker
        t={t}
        name={name}
        id={id}
        />, {
            duration: 5000,
        });
    }

    const addWorker = () => { 
        toast((t) => 
        <ToastAgregarWorker
        t={t}
        />, {
            duration: 100000,
        });
    }


    return (

        <>
          <div className='AñadirT'>
            <button
             className='btn-AñadirT '
                onClick={addWorker}
            >
                Añadir trabajador
            </button>
            </div>
            {
                workers && workers.map((worker) => (

                    <div className='cardW'>

                        <div
                            key={worker._id}
                            className=" head cardT"

                        >
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
                                        <p className="card-text">Email: {worker.email}</p>

                                    </div>
                                </div>

                                <div className='col crud'>
                                    <button
                                        className='btn-eliminar '
                                        onClick={() => onClick(worker.name, worker._id)}

                                    >Eliminar</button>
                                    <button
                                        className='btn-actualizar '
                                    >Acutalizar</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }







        </>
    )
}