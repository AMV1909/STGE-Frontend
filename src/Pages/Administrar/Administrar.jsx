
import React from 'react'
import { Navbar, CardWorker } from '../../Components'
import './Administrar.css'
import { useAppSelector } from '../../Hooks/store'
import { useWorkersActions } from '../../Hooks/useWorkerActions'
import { getWorkers } from '../../API/Workers'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { ToastAgregarWorker } from '../../Components/Toast/ToastAgregarWorker/ToastAgregarWorker'



export function Administrar() {

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

      <Navbar />



      <div className='divWorker'>

        <div className='AñadirT'>
          <button
            className='btn-AñadirT '
            onClick={addWorker}
          >
            Añadir trabajador
          </button>
        </div>

      <div className='divMap'>
          {

            worker.map((worker) => (
              <CardWorker
                key={worker._id}
                _id={worker._id}
                name={worker.name}
                email={worker.email}
                picture={worker.picture}
              />
            ))
          }
        </div>
      
      
      

         
        

      </div>

      



   


    </>

  )
}

