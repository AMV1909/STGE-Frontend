export function PTutorHome({ tutor }) {
    if (!tutor) {
        return (
            <img
                src="https://unab.edu.co/wp-content/uploads/2022/01/logo-u-vig.png"
                style={{ objectFit: "contain" }}
                alt="UnabImg"
                id="UnabImg"
            />
        );
    }
    return (
        <>
            <img src={tutor.picture} alt="User" id="UserSeleccionadoHome" />
            <h5>{tutor.name}</h5>
            <p>
                <b>ID:&nbsp;{tutor._id}</b>
            </p>
            <p>
                <b>Carrera:&nbsp;{tutor.career}</b>
            </p>
            <p>
                <b>Tiempo en reunion: &nbsp; {tutor.meetingTime}</b>
            </p>
        </>
    );
}
