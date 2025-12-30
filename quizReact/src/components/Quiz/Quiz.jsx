
import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";
import { data } from "../../Assets/data";

const TOTAL_QUESTIONS = 5; // 🔥 change this anytime (10, 20, 50)

const Quiz = () => {
  const shuffleQuestions = () => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_QUESTIONS);
  };

  const [questions, setQuestions] = useState(shuffleQuestions());
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index, questions]);

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const reset = () => {
    const newQuestions = shuffleQuestions();
    setQuestions(newQuestions);
    setIndex(0);
    setQuestion(newQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    option_array.forEach((option) => {
  if (option.current) {
    option.current.classList.remove("wrong");
    option.current.classList.remove("correct");
  }
});

  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      {/*<hr />*/}

      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            🎯You Scored {score} out of {questions.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
