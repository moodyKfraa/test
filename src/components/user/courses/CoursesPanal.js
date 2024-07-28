import React, { useEffect, useState } from "react";
import supabase from "../../../Supabase";
import Toast from "../../toast/Toast";
import coursesStyle from "./coursesPanal.module.css";
import { NavLink } from "react-router-dom";

function Courses({ userId }) {
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      await supabase
        .from("users")
        .select("courses")
        .eq("id", userId)
        .then(({ data }) => {
          if (data[0].courses) {
            data[0].courses.map(async (courseId) => {
              await supabase
                .from("courses_info")
                .select("*")
                .eq("id", courseId)
                .then(({ data, error }) => {
                  if (data) {
                    setcourses(data);
                  }
                  if (error) {
                    Toast(error.message);
                  }
                });
            });
          }
        });
    };
    if (userId) {
      fetchCourses();
    }
  }, [setcourses, userId]);
  return (
    <div className={coursesStyle.courses}>
      {courses.length ? (
        courses.map((course) => {
          return (
            <div className={coursesStyle.course}>
              <img
                src={`https://storage.bunnycdn.com/moody/courses_imgs/${course.img_url}?accessKey=bc6cca6a-239a-44b3-8849c0c36e0d-6472-4dd4`}
              />
              <NavLink to={"./course/" + course.name}>{course.name}</NavLink>
              <p>{course.price}</p>
            </div>
          );
        })
      ) : (
        <h1>No courses</h1>
      )}
    </div>
  );
}

export default Courses;
