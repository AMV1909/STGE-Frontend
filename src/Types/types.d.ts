export interface User {
    _id: string;
    role: "Student" | "Tutor" | "Worker" | "Admin";
    name: string;
    email: string;
    // password: string;
    picture: string;
    career: string;
    coursesToTeach?: { name: string; grade: number }[];
    score?: number;
}
