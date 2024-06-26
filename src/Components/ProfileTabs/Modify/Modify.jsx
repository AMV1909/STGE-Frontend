import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Curso from "../../Curso/Curso";
import { useAppSelector } from "../../../Hooks/store";
import { useUserActions } from "../../../Hooks/useUserActions";
import {
    getCoursesToTeach,
    updateCoursesToTeach,
} from "../../../API/CoursesToTeach";

export function Modify() {
    const user = useAppSelector((state) => state.user);
    const { updateCourses, callPreviousCourses } = useUserActions();
    const [coursesToTeach, setCoursesToTeach] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState(
        user.coursesToTeach || []
    );

    useEffect(() => {
        toast.loading("Obteniendo cursos...", {
            id: "loading",
            duration: 5000,
        });

        getCoursesToTeach()
            .then((courses) => {
                toast.dismiss("loading");

                courses.forEach((course) => {
                    return (course.grade = Number(course.grade));
                });

                setCoursesToTeach(courses);
            })
            .catch((err) => {
                toast.error("Error al obtener los cursos", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
            });
    }, []);

    const handleSelectCourse = (course) => {
        if (
            selectedCourses.find(
                (selectedCourse) => selectedCourse.nrc === course.nrc
            )
        ) {
            setSelectedCourses(
                selectedCourses.filter((selectedCourse) => {
                    return selectedCourse.nrc !== course.nrc;
                })
            );
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleContinue = async () => {
        updateCourses(selectedCourses);

        toast.loading("Actualizando cursos...", {
            id: "loading",
            duration: 5000,
        });

        await updateCoursesToTeach(selectedCourses)
            .then(() => {
                toast.dismiss("loading");
                toast.success("Cursos actualizados", { duration: 5000 });
            })
            .catch((err) => {
                callPreviousCourses();

                toast.dismiss("loading");
                toast.error("Error al actualizar los cursos", {
                    duration: 5000,
                });

                if (!err.response)
                    return toast.error(err.message, { duration: 5000 });

                if (err.response.status === 409)
                    toast.error(
                        "Algunos de los cursos que intenta registrar no cumplen con los requisitos",
                        { duration: 5000 }
                    );
            });
    };

    return (
        <div className="container imgHome">
            <div className="Cursos-Container">
                <h1>¿Que enseñaras?</h1>

                {user &&
                    coursesToTeach &&
                    coursesToTeach.map((course) => (
                        <Curso
                            key={course.nrc}
                            course={course}
                            handleSelectCourse={handleSelectCourse}
                            selected={
                                user.coursesToTeach &&
                                user.coursesToTeach.find((courseToTeach) => {
                                    return courseToTeach.nrc === course.nrc;
                                })
                                    ? true
                                    : false
                            }
                        />
                    ))}

                {user && coursesToTeach && (
                    <button
                        className=" btnCurso"
                        type="button"
                        onClick={handleContinue}
                        disabled={
                            selectedCourses.length === 0 ||
                            (selectedCourses.every((course) =>
                                user.coursesToTeach?.find(
                                    (courseToTeach) =>
                                        courseToTeach.nrc === course.nrc
                                )
                            ) &&
                                user.coursesToTeach?.every((course) =>
                                    selectedCourses.find(
                                        (courseToTeach) =>
                                            courseToTeach.nrc === course.nrc
                                    )
                                ))
                        }
                    >
                        Continuar
                    </button>
                )}
            </div>
        </div>
    );
}
