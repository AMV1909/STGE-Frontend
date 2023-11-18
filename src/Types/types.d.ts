export type User = {
    _id: string;
    role: "Student" | "Tutor" | "Worker" | "Admin";
    name: string;
    email: string;
    // password: string;
    picture: string;
    career?: string;
    pga?: number;
    coursesToTeach?: Course[];
    score?: number;
    countReviews?: number;
    meetingTime?: number;
    tutorCalendarId?: string;
};

export type Worker = {
    _id: string;
    role: "Worker";
    name: string;
    email: string;
    picture: string;
};

export type Tutor = {
    _id: string;
    role: "Tutor";
    name: string;
    email: string;
    picture: string;
    career: string;
    pga: number;
    coursesToTeach: Course;
    score: number;
    countReviews: number;
    meetingTime: number;
    tutorCalendarId: string;
    events: Events;
};

export type Course = {
    nrc: string;
    name: string;
    state: "Aprobado" | "Reprobado" | "Matriculado";
    grade: number;
};

export type Events = {
    _id: string;
    type: string;
    summary: string;
    description: string;
    course: string;
    student: student;
    tutor: tutor;
    start: string;
    end: string;
};

export type student = {
    id: string;
    name: string;
    email: string;
    picture: string;
};

export type tutor = {
    id: string;
    name: string;
    email: string;
    picture: string;
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
    TutorsList = "/tutors-list",
    Admin = "/admin",
    Profile = "/profile",
}

export type ProfileTabs =
    | ""
    | "schedule"
    | "scheduled"
    | "completed"
    | "modify";
