import React, { useEffect, useState } from "react";
import supabase from "../../../Supabase";
import Toast from "../../toast/Toast";

function Result({
  questions,
  courseId,
  elId,
  prevAttemptAnswers,
  showPrevAttemptResults,
}) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctSelection, setCorrectSelecteion] = useState(0);
  const [wrongSelection, setWrongSelection] = useState(0);
  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      await supabase
        .from(courseId.join("-"))
        .select("correct_answers")
        .eq("id", elId)
        .then(({ data, error }) => {
          if (error) {
            Toast("حدث خطا ما");
            return;
          }
          if (data[0]) {
            setCorrectAnswers(data[0].correct_answers);
            let correctI = 0;
            let wrongeI = 0;
            // eslint-disable-next-line array-callback-return
            data[0].correct_answers.map((correctAnswer, inn) => {
              if (correctAnswer === questions[inn].selectedAnswer) {
                correctI++;
              } else {
                wrongeI++;
              }
            });
            setCorrectSelecteion(correctI);
            setWrongSelection(wrongeI);
          }
        });
    };
    fetchCorrectAnswers();
  }, [courseId, elId, questions]);
  return (
    questions && (
      <div>
        <p>{correctSelection}</p>
        <p>{wrongSelection}</p>
        <hr />
        {correctAnswers.map((correctAnswer, inn) => {
          if (showPrevAttemptResults) {
            if (correctAnswer === prevAttemptAnswers[inn]) {
              return (
                <div key={inn}>
                  <p>{inn + 1}</p>
                  <p>{questions[inn].question}</p>
                  <p>{questions[inn].answers[correctAnswer]}</p>
                  <hr />
                </div>
              );
            } else {
              return (
                <div key={inn}>
                  <p>{inn + 1}</p>
                  <p>{questions[inn].question}</p>
                  <p>{questions[inn].answers[+prevAttemptAnswers[inn]]}</p>
                  <p>{questions[inn].answers[correctAnswer]}</p>
                  <hr />
                </div>
              );
            }
          } else {
            if (correctAnswer === questions[inn].selectedAnswer) {
              return (
                <div key={inn}>
                  <p>{inn + 1}</p>
                  <p>{questions[inn].question}</p>
                  <p>{questions[inn].answers[correctAnswer]}</p>
                  <hr />
                </div>
              );
            } else {
              return (
                <div key={inn}>
                  <p>{inn + 1}</p>
                  {/* <p>{questions[inn].question}</p> */}
                  <p>{questions[inn].answers[questions[inn].selectedAnswer]}</p>
                  <p>{questions[inn].answers[correctAnswer]}</p>
                  <hr />
                </div>
              );
            }
          }
        })}
      </div>
    )
  );
}

export default Result;
