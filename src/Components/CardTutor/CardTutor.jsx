// this is the card for the tutors

import "./CardTutor.css";
import ReactStars from "react-rating-stars-component";
export function CardTutor() {
    
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
        document.getElementById("where-to-render")

    return (

        <>
            <div className="card head" >
                <div className="row g-0">
                    <div className="col-md-3 imgUserdiv">
                        <img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" className="img-fluid rounded-start imgUser " alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body cardUserT">
                            <p className="card-nombre"><b>Nombre:</b></p>
                            <p className="card-text programa"><b>Programa:</b></p>

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

        </>


    )
}
export default CardTutor;