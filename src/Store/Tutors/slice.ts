import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tutor } from "../../Types/types.d";

const initialState: Tutor[] = [
    {
        _id: "",
        role: "Tutor",
        name: "",
        email: "",
        picture: "",
        career: "",
        coursesToTeach: { nrc: "", name: "", state: "Aprobado", grade: 0 },
        score: 0,
        pga: 0,
        countReviews: 0,
        meetingTime: 0,
        tutorCalendarId: "",
        events: {
            _id: "",
            type: "",
            summary: "",
            description: "",
            course: "",
            student: { id: "", name: "", email: "", picture: "" },
            tutor: { id: "", name: "", email: "", picture: "" },
            start: "",
            end: "",
        },
    },
];

export const tutorsSlice = createSlice({
    name: "tutors",
    initialState,
    reducers: {
        setTutorsInfo: (state, action: PayloadAction<Tutor[]>) => {
            localStorage.setItem("tutors", JSON.stringify(state));

            return [...action.payload];
        },

        setSearchingTutorsInfo: (_, action: PayloadAction<Tutor[]>) => {
            return [...action.payload];
        },

        resetTutorsInfo: () => {
            if (!localStorage.getItem("tutors")) return initialState;

            return JSON.parse(localStorage.getItem("tutors")!) as Tutor[];
        },
    },
});

export default tutorsSlice.reducer;

export const { setTutorsInfo, resetTutorsInfo, setSearchingTutorsInfo } =
    tutorsSlice.actions;
