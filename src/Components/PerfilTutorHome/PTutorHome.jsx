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
            {window.location.pathname === "/lista-estudiantes" && (
                <p>
                    <b>ID:&nbsp;{tutor._id}</b>
                </p>
            )}

            <p>
                <strong>Carrera: </strong> {tutor.career}
            </p>

            {window.location.pathname === "/home" && (
                <p>
                    <strong>Curso: </strong>
                    {tutor.coursesToTeach.name} ({tutor.coursesToTeach.grade})
                </p>
            )}

            {window.location.pathname === "/lista-estudiantes" && (
                <p>
                    <strong>Tiempo en reunion: </strong>{" "}
                    {new Date(tutor.meetingTime * 60000)
                        .toISOString()
                        .substr(11, 8)}
                </p>
            )}
        </>
    );
}
