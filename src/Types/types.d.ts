export type User = {
    _id: string;
    role: "Student" | "Tutor" | "Worker" | "Admin";
    name: string;
    email: string;
    // password: string;
    picture: string;
    career: string;
    pga: number;
    coursesToTeach?: Course[];
    score?: number;
};

export type Course = {
    nrc: string;
    name: string;
    state: "Aprobado" | "Reprobado" | "Matriculado";
    grade: number;
};

export type TempUser = {
    id: string;
    name: string;
    email: string;
    picture: string;
    career: string;
    program_type: "Pregrado" | "Posgrado";
    active_disciplinary_processes: boolean;
    pga: number;
    courses: Course[];
};

export enum PathRoutes {
    Home = "/",
    Login = "/login",
    Register = "/register",
    SelectCoursesToTeach = "/select-courses-to-teach",
}
