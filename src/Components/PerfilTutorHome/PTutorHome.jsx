export function PTutorHome({ tutor }) {
    if (!tutor) {
        return (
            <>
                <img
                    src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"
                    alt="User"
                    id="UserSeleccionadoHome"
                />
                <p>
                    <b>Nombre del estudiante</b>
                </p>
                <p>
                    <b>Programa</b>
                </p>
                <p>
                    <b>ID</b>
                </p>
                <p>
                    <b>Tiempo en reunión</b>
                </p>
            </>
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
