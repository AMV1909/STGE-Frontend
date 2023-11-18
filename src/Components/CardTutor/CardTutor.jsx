// this is the card for the tutors
import { toast } from "react-hot-toast";
import "./CardTutor.css";
import { useAppSelector } from "../../Hooks/store";
import ReactStars from "react-rating-stars-component";

export function CardTutor({ tutor, onCardClick, onToggleClick }) {
    const user = useAppSelector((state) => state.user);

    const ratingchanged = (newRating) => {
        console.log(newRating);
    };

    document.getElementById("where-to-render");

    const handleCardClick = (tutor) => {
        if (user.role === "Student") {
            onCardClick(tutor);
            onToggleClick();
            console.log(tutor);
            return;
        } else {
            if (
                window.location.pathname === "/lista-estudiantes" &&
                (user.role === "Worker" || user.role === "Admin")
            ) {
                onCardClick(tutor);
                onToggleClick();
                console.log(tutor);
                return;
            }
        }

        toast.error(
            "Solo los estudiantes pueden seleccionar tutores para agendar tutorías",
            { duration: 5000 }
        );
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
                                        <strong>Nombre: </strong>
                                        {tutor.name}
                                    </p>
                                    <p className="card-text programa">
                                        <strong>Programa: </strong>
                                        {tutor.career}
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
        </>
    );
}
