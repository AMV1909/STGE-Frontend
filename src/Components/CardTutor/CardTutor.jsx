// this is the card for the tutors

import { getTutors } from "../../API/Tutors";
import { useEffect, useState } from "react";
import "./CardTutor.css";
import ReactStars from "react-rating-stars-component";
import { useTutorsActions } from "../../Hooks/useTutorsActions";
import { useAppSelector } from "../../Hooks/store";

export function CardTutor({onCardClick}) {
    const { setTutors } = useTutorsActions();
    const tutors = useAppSelector((state) => state.tutors);

    
    useEffect(() => {
        if (tutors.length === 0 || tutors[0]._id !== "") return;

        getTutors().then((response) => {
            setTutors(response);
        });
    }, [setTutors, tutors]);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    document.getElementById("where-to-render");

    const handleCardClick = (tutor) => {
        onCardClick(tutor);
    };

    return (
        <>
            {tutors.map((tutor) => (
                <div key={tutor._id} className="card head" onClick={() => handleCardClick(tutor)} >
                    <div className="row g-0"  >
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
                                            disabled={  
                                                tutor.score === 0 ? true : false
                                            }
                                        />

                                        <p>({tutor.score})</p>
                                    </div>
                                </div>
                            
                            
                                <p>
                                   
                                    {tutor.coursesToTeach.name} (
                                    {tutor.coursesToTeach.grade})
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
