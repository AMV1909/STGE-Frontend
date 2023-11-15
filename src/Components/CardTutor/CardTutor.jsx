// this is the card for the tutors
import { toast } from "react-hot-toast";
import { getTutors } from "../../API/Tutors";
import { useEffect } from "react";
import "./CardTutor.css";
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { useAppSelector } from "../../Hooks/store";
import ReactStars from "react-rating-stars-component";


export function CardTutor({ tutor, onCardClick, onToggleClick}) {

 



  const ratingchanged = (newRating) => {
    console.log(newRating);
  };

  document.getElementById("where-to-render");

  const handleCardClick = (tutor) => {
    if (user.role !== "Student") {
      if (
        window.location.pathname === "/lista-estudiantes" &&
        user.role !== "Worker" &&
        user.role !== "Admin"
      )
      
      return toast.error(
        "Solo los estudiantes pueden seleccionar tutores para agendar reuniones",
        { duration: 5000 }
      );
    }

  const handleCardClick = (tutor) => {
   
    
    onCardClick(tutor);
    onToggleClick();
    console.log(tutor);

  };


  return (
    <>

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
                    onChange={ratingchanged}
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

    </>
  );
}