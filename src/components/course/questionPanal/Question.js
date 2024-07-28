import React from "react";

function Question({ question }) {
  const handleSelect = (inn, e) => {
    document
      .querySelectorAll(".answer")
      .forEach((answer) => (answer.className = "answer"));
    e.target.className = "answer selected_answer";
    let newQuestionObj = question;
    newQuestionObj.selectedAnswer = inn;
  };

  return (
    <div>
      <h1>{question.question}</h1>
      <div>
        {question.answers.map((answer, inn) => {
          return (
            <div
              onClick={(e) => handleSelect(inn, e)}
              className={`${
                Object.keys(question).includes("selectedAnswer")
                  ? question.selectedAnswer === inn
                    ? "answer selected_answer"
                    : "answer"
                  : "answer"
              }`}
              key={inn}
            >
              {answer}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
