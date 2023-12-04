import { lazy } from "react";

const pages = {
    Home: lazy(() =>
        import("./Inicio/Home").then(({ Home }) => ({ default: Home }))
    ),
    LEstudiantes: lazy(() =>
        import("./Lista Estudiantes/LEstudiantes").then(({ LEstudiantes }) => ({
            default: LEstudiantes,
        }))
    ),
    Administrar: lazy(() =>
        import("./Administrar/Administrar").then(({ Administrar }) => ({
            default: Administrar,
        }))
    ),
    Login: lazy(() =>
        import("./Login/Login").then(({ Login }) => ({ default: Login }))
    ),
    SignUp: lazy(() =>
        import("./Sign Up/SignUp").then(({ SignUp }) => ({ default: SignUp }))
    ),
    NotFound: lazy(() =>
        import("./NotFound/NotFound").then(({ NotFound }) => ({
            default: NotFound,
        }))
    ),
    SelectCursos: lazy(() =>
        import("./Cursos/SelectCursos").then(({ SelectCursos }) => ({
            default: SelectCursos,
        }))
    ),
    PerfilUser: lazy(() =>
        import("./PerfilUser/PerfilUser").then(({ PerfilUser }) => ({
            default: PerfilUser,
        }))
    ),
};

export const {
    Home,
    LEstudiantes,
    Administrar,
    Login,
    SignUp,
    NotFound,
    SelectCursos,
    PerfilUser,
} = pages;
