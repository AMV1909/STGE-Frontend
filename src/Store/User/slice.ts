import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/types.d";

const initialState: User = {
    _id: "",
    role: "Student",
    name: "",
    email: "",
    picture: "",
    career: "",
    coursesToTeach: [],
    score: 0,
    pga: 0,
    countReviews: 0,
    meetingTime: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (_, action: PayloadAction<User>) => {
            return { ...action.payload };
        },

        logout: () => {
            return { ...initialState };
        },
    },
});

export default userSlice.reducer;

export const { setUserInfo, logout } = userSlice.actions;
