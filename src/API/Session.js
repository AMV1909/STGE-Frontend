import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserData = async () => {
    return await axios
        .get(`${API_URL}/google/user`, {
            headers: {
                "x-google-access-token": localStorage.getItem("google-token"),
            },
        })
        .then((res) => res.data);
};

// export const login = async (email, password) => {};

export const googleLogin = async () => {
    return await axios
        .post(`${API_URL}/google/login`, null, {
            headers: {
                "x-google-access-token": localStorage.getItem("google-token"),
            },
        })
        .then((res) => res.data);
};

export const googleRegister = async (coursesToTeach, role = "Student") => {
    return await axios
        .post(
            `${API_URL}/google/register`,
            {
                role,
                coursesToTeach,
            },
            {
                headers: {
                    "x-google-access-token":
                        localStorage.getItem("google-token"),
                },
            }
        )
        .then((res) => res.data);
};
