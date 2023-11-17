
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar, Splitestudiantes, CardTutor, PTutorHome } from '../../Components'
import { getTutorWorker } from '../../API/Tutors';

import './LEstudiantes.css'
import toast from 'react-hot-toast';
import { useUserActions } from '../../Hooks/useUserActions';
import { useNavigate } from 'react-router';





export function LEstudiantes() {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [mostrarColumnaDerecha, setMostrarColumnaDerecha] = useState(false);

  const { logoutUser } = useUserActions();
  const navigate = useNavigate();
  

  const toggleColumnaDerecha = () => {
    if (window.innerWidth <= 768) {
      setMostrarColumnaDerecha(!mostrarColumnaDerecha);
    }
  };

  const resetColumnaDerecha = () => {
    setMostrarColumnaDerecha(false);
  };


  const [tutorSeleccionado, setTutorSeleccionado] = useState(null);

  const handleCardClick = (tutor) => {
    setTutorSeleccionado(tutor);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMostrarColumnaDerecha(false);
      }


    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };


  }, []);


  
 
  const [tutors, setTutors] = useState([]);
  const originalTutors = useRef(tutors);

  useEffect(() => {
    getTutorWorker()
      .then((response) => {
        setTutors(response);
        console.log(response);
        console.log("Tutores obtenidos")
      })
      .catch((err) => {
        toast.error("Error al obtener tutores", { duration: 5000 });
        toast.error(err.message, { duration: 5000 });

        if (err.response.status === 500) {
          logoutUser();
          navigate("/login");
          return toast.error("La sesión ha expirado");
      }
      });
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTutors = useMemo(() => {
    if (tutors === null) return [];

    if (search === "" && !toggle) return originalTutors.current;

    const searchTutors = tutors.filter(
        (tutor) =>
            tutor.name.toLowerCase().includes(search.toLowerCase()) ||
            tutor.career.toLowerCase().includes(search.toLowerCase())
    );

    return toggle
        ? searchTutors.filter((tutor) => tutor.meetingTime >= 80)
        : searchTutors;
}, [search, toggle, tutors]);


  return (
    <>
      <Navbar />
      <Splitestudiantes>
        <div className={`left-column ${mostrarColumnaDerecha ? 'columna-izquierda-oculta' : ''}`}>

              <div className="stge__buscador">
                    <input
                        type="search"
                        name="name"
                        autoComplete="off"
                        onChange={onChange}
                        value={search}
                    />

                    <button
                        className={`${!toggle && "off"}`}
                        onClick={() => setToggle(!toggle)}
                    >
                        +80 Horas
                    </button>
                </div>



          <div className="row divList ">
                   
                  {
                    
                    filteredTutors.map((tutor) => (
                     
                        <CardTutor
                          tutor={tutor}
                          onCardClick={handleCardClick}
                          onToggleClick={toggleColumnaDerecha}

                        />
                    
                    ))
                  }
                   


            <div className="col-sm-4">

             
            </div>



          </div>
        </div>
        <div className={`right-columnHome${mostrarColumnaDerecha ? 'columna-derecha-visible' : ''}`}>
          <div className='imgcontainer'>

          <button type="button" className=" btn btnAtras btn-link" onClick={resetColumnaDerecha}>Atras</button>
            < div style={{ overflow: "hidden"}} className=' rowUsuario'>

            <PTutorHome
              tutor={tutorSeleccionado}
            />

            

               


            </div>

            <div className='table-list-tutors'>
            {tutorSeleccionado && tutorSeleccionado.events && tutorSeleccionado.events.length > 0 ? (
                <table>
                <thead>
                    <th>Estudiante</th>
                    <th>Curso</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de finalización</th>
                    <th>Estado</th>
                </thead>

                <tbody>
                    {tutorSeleccionado.events.map((event) => {
                        let start = new Date(
                            event.start
                        ).toLocaleDateString("es-CO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        });

                        let end = new Date(
                            event.end
                        ).toLocaleDateString("es-CO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        });

                        start =
                            start.charAt(0).toUpperCase() +
                            start.slice(1);
                        end =
                            end.charAt(0).toUpperCase() +
                            end.slice(1);

                        return (
                            <tr key={event._id}>
                                <td>{event.student.name}</td>
                                <td>{event.course}</td>
                                <td>{start}</td>
                                <td>{end}</td>
                                <td>{event.type}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
               ): (
                <h3 style={{ textAlign: "center" }}>El tutor no tiene eventos registrados</h3>
               )}
            </div>
          </div>

        </div>
      </Splitestudiantes>
    </>
  )
}
