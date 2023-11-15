import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
 
export const getWorkers = async () => {
    return await axios
        .get(`${API_URL}/workers`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
            }

            return res.data.workers;
        });
}

export const setWorker = async (name,email,picture) => {
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("picture", picture);

 
    return await axios
        .post(`${API_URL}/workers`, formData, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            

        })
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
                console.log(res.data.worker);
            }

            return res.data.worker;
            
        });
}



export const deleteWorker = async (workerId) => {
    return await axios
        .delete(`${API_URL}/workers/${workerId}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
            }

            return res.data.worker;
        });
}

export const updateWorker = async (workerId, name, email, picture) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("picture", picture);

    return await axios
        .put(`${API_URL}/workers/${workerId}`, formData, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            if (res.status === 229) {
                localStorage.setItem("token", res.data.token);
            }

            return res.data.worker;
        });
}



