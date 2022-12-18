import React, { useState, useEffect } from 'react';
import './QuizApp.css';
import Header from './components/Header/Header.js';
import Quiz from './components/Quiz/Quiz.js';
import Result from './components/Result/Result.js';
import CorrectAnswers from './components/CorrectAnswers/CorrectAnswers.js';
import quizQuestions from './dataGathering/dataQuestions';

function QuizApp() {

  // Header & quiz question's display
  const [headerDisplay, setHeaderDisplay] = useState(true);
  const [quizDisplay, setQuizDisplay] = useState(false);

  // Buttons' styling
  const [startSubmitButtonText, setButtonText] = useState("Start Quiz");
  const [buttonStyle, setButtonStyle] = useState({});

  // Results' display
  const [resultDisplay, setResultDisplay] = useState(false);

  // Current index, progress bar's width, timer bar's width & quiz score
  const [current, setCurrent] = useState(0); // current refers the current index.
  const [timeWidth, setTimeWidth] = useState(100);
  const [seconds, setSeconds] = useState(60); // You start each question with 60 seconds.
  const [score, setScore] = useState(0);

  // Time interval 
  const [timeInterval, setTimeInterval] = useState(0); 
  const [secondInterval, setSecondInterval] = useState(0);

  // Showing correct answers
  const [correctArr, setCorrectArr] = useState([]);
  const [correctAnswerDisplay, setCorrAnsDisplay] = useState(false);

  const indexLength = quizQuestions.length - 1; // indexLength refers to the number of indexes.

  useEffect(() => {
    if (timeWidth === 0 && seconds === 0) {
      setTimeWidth(100);
      setSeconds(60);
      setCurrent(current + 1);
      setCorrectArr([...correctArr, false]);
    }
    if (current === indexLength) {
      setButtonText("Submit & Finish");
    }
    if (current > indexLength) {
      clearInterval(timeInterval);
      clearInterval(secondInterval);
      setQuizDisplay(false);
      setResultDisplay(true);
    }
  }, [current, indexLength, timeInterval, secondInterval, timeWidth, seconds, correctArr]);

  const startSubmitClick = (event) => {

    setTimeWidth(100);
    setSeconds(60);

    if (current < indexLength) {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
      if (secondInterval) {
        clearInterval(secondInterval);
      }
      const newTimeInterval = setInterval(() => {
        setTimeWidth(currTimeWidth => currTimeWidth - 10);
      }, 6000);
      setTimeInterval(newTimeInterval);
      const newSecondInterval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000)
      setSecondInterval(newSecondInterval);
    }

    if (headerDisplay) {
      setButtonText("Submit");
      setButtonStyle({fontSize: "0.875em"});
      setHeaderDisplay(false);
      setQuizDisplay(true);
    }

    if (quizDisplay) {
      setCurrent(current + 1);

      var answerInput = document.getElementsByName(`question${current + 1}`);
      
      for (let i = 0; i < answerInput.length; i++) {
        if (answerInput[i].value === quizQuestions[current].correctAnswer) {                            
          if (answerInput[i].checked) {
            setScore(score + 1);
            setCorrectArr([...correctArr, true]);
          }
          else {
            setCorrectArr([...correctArr, false]);
          }
          break;
        } 
      }
    }

    event.preventDefault();
  }

  const reviewClick = () => {
    setResultDisplay(false);
    setCorrAnsDisplay(true);
  }

  const restartClick = () => {
    window.location.reload(); // Restarting the quiz
  }

  const backToResults = () => {
    setResultDisplay(true);
    setCorrAnsDisplay(false);
  }

  return (
    <div className="QuizApp">
      <Header display={headerDisplay} />
      <Quiz questions={quizQuestions} currentIndex={current} timeWidth={timeWidth} time={seconds} display={quizDisplay} /> 
      <Result questions={quizQuestions} score={score} display={resultDisplay} />
      <CorrectAnswers questions={quizQuestions} corrections={correctArr} display={correctAnswerDisplay} />
      <div className="Buttons">
        {current <= indexLength && <button type="button" className="start-submit-finish-btn" style={buttonStyle} onClick={startSubmitClick}>{startSubmitButtonText}</button>}
        {resultDisplay && 
          <>
            <button type="button" className="review-btn" onClick={reviewClick}>Review Quiz</button>
            <button type="button" className="restart-btn" id="RestartButton" onClick={restartClick}>Restart Quiz</button>
          </>
        }
        {correctAnswerDisplay && <button type="button" className="backToResults-btn" id="BackToResultsButton" onClick={backToResults}>Back to Results</button>}
      </div>
    </div>
  );
}

export default QuizApp;