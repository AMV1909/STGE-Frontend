// this is the card for the tutors

import { getTutors } from "../../API/Tutors";
import { useEffect, useState } from 'react'
import "./CardTutor.css";
import ReactStars from "react-rating-stars-component";
export function CardTutor() {
    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        getTutors().then((response) => {
            setTutors(response);
        });

    }, []);

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
        document.getElementById("where-to-render")
      
    return (

        <>
        {tutors.map((tutor) => (
            <div className="card head" >
                <div className="row g-0">
                    <div className="col-md-3 imgUserdiv">
                        <img src={tutor.picture} className="img-fluid rounded-start imgUser " alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body cardUserT">
                            <p className="card-nombre"><b>Nombre:{tutor.name} </b></p>
                            <p className="card-text programa"><b>Programa:{tutor.career }  </b></p>

                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                activeColor="#ffd700"
                            />



                        </div>
                    </div>
                </div>
            </div>
                ))}
        </>


    )
}
export default CardTutor;