import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/types";

const initialState: User = {
    _id: "",
    role: "Student",
    name: "",
    email: "",
    // password: "",
    picture: "",
    coursesToTeach: [],
    score: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                ...action.payload,
                coursesToTeach:
                    action.payload.role === "Tutor"
                        ? action.payload.coursesToTeach
                        : undefined,
                score:
                    action.payload.role === "Tutor"
                        ? action.payload.score
                        : undefined,
            };
        },

        logout: () => {
            return { ...initialState };
        },
    },
});

export default userSlice.reducer;

export const { setUserInfo, logout } = userSlice.actions;
