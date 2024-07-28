import React, { useEffect, useState } from "react";
import supabase from "../../Supabase";
import courseStyle from "./course.module.css";
import Toast from "../toast/Toast";
import QuestionsPanal from "./questionPanal/QuestionsPanal";
import FilePanal from "./filePanal/FilePanal";
import VideoPanal from "./videoPanal/VideoPanal";

function Course() {
  const courseNameFromLink = window.location.pathname.split("/")[3];
  const [data, setData] = useState([]);
  const [activePanal, setActivePanal] = useState();
  const [activeElement, setActiveElement] = useState();
  const [courseId, setCourseId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      await supabase
        .from(courseId)
        .select("title,disc,type,content,id,url")
        .then(({ data, error }) => {
          if (data) {
            setData(data);
          }
          if (error) {
            Toast(error.message);
          }
        });
    };
    supabase.auth.getUser().then(async (userData) => {
      if (userData.error) {
        Toast(userData.error.message);
        return;
      }
      if (userData.data) {
        setUserId(userData.data.user.id.split("-"));
        await supabase
          .from("courses_info")
          .select("id")
          .eq("name", courseNameFromLink)
          .then(async ({ data, error }) => {
            if (error) {
              Toast(error.message);
              return;
            }
            if (data) {
              await supabase
                .from("users")
                .select("courses")
                .eq("id", userData.data.user.id)
                .then((userCourses) => {
                  if (userCourses.error) {
                    Toast(error.message);
                    return;
                  }
                  if (userCourses.data[0].courses) {
                    // eslint-disable-next-line array-callback-return
                    userCourses.data[0].courses.map((courseId) => {
                      if (courseId === data[0].id) {
                        fetchCourse(data[0].id);
                        setCourseId(data[0].id.split("-"));
                      }
                    });
                  }
                });
            }
          });
      }
    });
  }, [courseNameFromLink]);

  return (
    data.length && (
      <div className={courseStyle.course} style={{ marginTop: 150 }}>
        {activePanal === "mcq" ? (
          <QuestionsPanal
            data={data[activeElement].content}
            courseId={courseId}
            elId={data[activeElement].id}
            userId={userId}
          />
        ) : activePanal === "file" ? (
          <FilePanal data={data[activeElement]} />
        ) : (
          activePanal === "video" && <VideoPanal data={data[activeElement]} />
        )}
        <div>
          {data.map((el, inn) => {
            return (
              <div
                key={inn}
                onClick={() => {
                  setActiveElement(inn);
                  setActivePanal(el.type);
                }}
                style={{
                  backgroundColor: `${el.type === "mcq" ? "red" : "green"}`,
                }}
              >
                <h1>{el.title}</h1>
                <p>{el.disc}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Course;
