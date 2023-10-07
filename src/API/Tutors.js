import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTutors = async () => {
    return await axios
        .get(`${API_URL}/tutors`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => res.data);
};

export const searchTutors = async ({ type_search, search }) => {
    return await axios
        .get(`${API_URL}/tutors/search`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
            params: {
                type_search,
                search,
            },
        })
        .then((res) => res.data);
};

export const getCourse = async () => {
    let sessionToken = localStorage.getItem("token")
    console.log(sessionToken);
    console.log(API_URL);
    return await axios
        .get(`${API_URL}/courses-to-teach`, {
            headers: {
                "x-access-token":sessionToken ,
            },
        })
        .then((res) => res.data);
}

  
export const putCourse = async (updateCourses ) => {
    return await axios
    
        .put(`${API_URL}/courses-to-teach`, { coursesToTeach: updateCourses },  {
            headers: {
              
                "x-access-token": localStorage.getItem("token"),
            },
             
            body: {
                coursesToTeach : updateCourses
                
            },
           
            
        })
        .then((res) => res.data);
}