import { deleteTempUserInfo, setTempUserInfo } from "../Store/TempUser/slice";
import { useAppDispatch } from "./store";
import { TempUser } from "../Types/types.d";

export const useTempUserActions = () => {
    const dispatch = useAppDispatch();

    const setTempUser = (user: TempUser) => {
        if (!user) return;

        dispatch(setTempUserInfo(user));
    };

    const deleteData = () => {
        dispatch(deleteTempUserInfo());
    };

    return { setTempUser, deleteData };
};

