import { useAppDispatch } from "./store";
import { Worker } from "../Types/types";

import { setWorkersInfo, resetWorkersInfo } from "../Store/Workers/slice";

export const useWorkersActions = () => {
    const dispatch = useAppDispatch();

    const setWorkers = (workers: Worker[]) => {
        dispatch(setWorkersInfo(workers));
    };

    const resetWorkers = () => {
        dispatch(resetWorkersInfo());
    };

    return { setWorkers, resetWorkers };
};
