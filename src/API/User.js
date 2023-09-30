import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const restoreSession = async () => {
    return await axios
        .get(`${API_URL}/session`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => res.data);
};