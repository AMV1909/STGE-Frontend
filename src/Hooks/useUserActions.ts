import { User } from "../Types/types";
import { setUserInfo, logout } from "../Store/User/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const setUser = (user: User) => {
        dispatch(setUserInfo(user));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    return { setUser, logoutUser };
};