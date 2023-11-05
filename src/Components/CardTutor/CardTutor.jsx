// this is the card for the tutors
import { toast } from "react-hot-toast";
import { getTutors } from "../../API/Tutors";
import { useEffect, useState } from "react";
import "./CardTutor.css";
import ReactStars from "react-rating-stars-component";
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { useAppSelector } from "../../Hooks/store";

export function CardTutor({ onCardClick, onToggleClick }) {
  const { setTutors } = useTutorsActions();
  const user = useAppSelector((state) => state.user);
  const tutors = useAppSelector((state) => state.tutors);

  useEffect(() => {
    if (tutors.length === 0 || tutors[0]._id !== "") return;

    getTutors()
      .then((response) => {
        setTutors(response);
      })
      .catch((err) => {
        toast.error("Error al obtener tutores", { duration: 5000 });
        toast.error(err.message, { duration: 5000 });
      });
  }, [setTutors, tutors]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  document.getElementById("where-to-render");

  const handleCardClick = (tutor) => {
    if (user.role !== "Student") {
      return toast.error(
        "Solo los estudiantes pueden seleccionar tutores para agendar reuniones",
        { duration: 5000 }
      );
    }

    onCardClick(tutor);
    onToggleClick();
  };

  return (
    <>
      {tutors && tutors.map((tutor) => (
        <div
          key={tutor._id}
          className="card head cardT"
          onClick={() => handleCardClick(tutor)}
        >
          <div className="row g-0">
            <div className="col-md-3 imgUserdiv">
              <img
                src={tutor.picture}
                className="img-fluid rounded-start imgUser "
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body cardUserT">
                <div className="cardUserT__info">
                  <div className="cardUserT__personal">
                    <p className="card-nombre">
                      <b>Nombre: {tutor.name} </b>
                    </p>
                    <p className="card-text programa">
                      <b>Programa: {tutor.career} </b>
                    </p>
                  </div>

                  <div className="scoreTutor">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      activeColor="#ffd700"
                      value={tutor.score}
                      disabled={tutor.score === 0 ? true : false}
                    />

                    <p>({tutor.score})</p>
                  </div>
                </div>

                <p>
                  {tutor.coursesToTeach.name} ({tutor.coursesToTeach.grade})
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default CardTutor;
