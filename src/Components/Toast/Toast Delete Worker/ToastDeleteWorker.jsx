
import React from 'react'
import { toast } from 'react-hot-toast'


import './ToastDeleteWorker.css'

export function ToastDeleteWorker({ worker }) {

    const { setWorkers } = useWorkersActions();
    const workers = useAppSelector((state) => state.workers);


    deleteWorker(worker._id)
        .then((response) => {
            toast.success("Trabajador eliminado", { duration: 5000 });
            setWorkers(response);
            
        })
        .catch((err) => {
            toast.error("Error al eliminar trabajador", { duration: 5000 });
            toast.error(err.message, { duration: 5000 });
        });

    return (


        <div class="toastDeleteWorker">
            <div class="toastDeleteWorkerDiv">
                <div class="toastDeleteWorkerDiv1">
                    <p>¿Estas seguro que deseas eliminar este trabajador?</p>
                </div>
                <div class="toastDeleteWorkerDiv2">
                    <button class="ToastCancelar">
                        Cancelar
                    </button>
                    <button class="EliminarWorker">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>


    )
}