import React, { useEffect, useState } from "react";
import Toast from "../toast/Toast";
import supabase from "../../Supabase";

function Years() {
  const [data, setData] = useState([]);
  const selectedYear = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchCoursesforSelectedYear = async () => {
      await supabase
        .from("courses_info")
        .select("*")
        .eq("year", selectedYear)
        .then(({ data, error }) => {
          if (error) {
            Toast(error);
            return;
          }
          if (data.length) {
            setData(data);
          }
        });
    };
    fetchCoursesforSelectedYear();
  }, [selectedYear, setData]);
  return data.length ? (
    <div>
      {data.map((course, inn) => {
        return (
          <div key={inn}>
            <h1>{course.title}</h1>
            <p>{course.price}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>no courses yet</h1>
  );
}

export default Years;
