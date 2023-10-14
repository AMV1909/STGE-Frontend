import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCoursesToTeach = async () => {
    return await axios
        .get(`${API_URL}/courses-to-teach`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
            }

            return res.data.coursesToTeach;
        });
};

export const updateCoursesToTeach = async (coursesToTeach) => {
    return await axios
        .put(
            `${API_URL}/courses-to-teach`,
            { coursesToTeach },
            {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }
        )
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
            }

            return res.data.coursesToTeach;
        });
};
