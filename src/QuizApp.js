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
  const [progressWidth, setProgressWidth] = useState(10);
  const [time, setTime] = useState(100);
  const [score, setScore] = useState(0);

  // Time interval 
  const [timeInterval, setTimeInterval] = useState(0); 

  // Showing correct answers
  const [correctArr, setCorrectArr] = useState([]);
  const [correctAnswerDisplay, setCorrAnsDisplay] = useState(false);

  const indexLength = quizQuestions.length - 1; // indexLength refers to the number of indexes.

  useEffect(() => {
    if (time === 0) {
      setTime(100);
      setCurrent(current + 1);
      setProgressWidth(progressWidth + 10);
      setCorrectArr([...correctArr, false]);
    }
    if (current > indexLength) {
      clearInterval(timeInterval);
      setQuizDisplay(false);
      setResultDisplay(true);
    }
  }, [current, indexLength, timeInterval, time, progressWidth, correctArr]);

  const startSubmitClick = (event) => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
    setTime(100);

    if (current < indexLength) {
      const newTimeInterval = setInterval(() => {
        setTime(currentTime => currentTime - 10);
      }, 6000);
      setTimeInterval(newTimeInterval);
    }

    if (headerDisplay) {
      setButtonText("Submit");
      setButtonStyle({fontSize: "0.875em"});
      setHeaderDisplay(false);
      setQuizDisplay(true);
    }

    if (quizDisplay) {
      setProgressWidth(progressWidth + 10);
      setCurrent(current + 1);

      var answerInput = document.getElementsByName(`question${current + 1}`);
      
      for (let i = 0; i < answerInput.length; i++) {
        if (answerInput[i].value === quizQuestions[current].correctAnswer) {                            
          if (answerInput[i].checked) {
            setScore(score + 1);
            setCorrectArr([...correctArr, true]);
            break;
          }
          else {
            setCorrectArr([...correctArr, false]);
            break;
          }
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
      <Quiz questions={quizQuestions} currentIndex={current} progressWidth={progressWidth} time={time} display={quizDisplay} /> 
      <Result questions={quizQuestions} currentIndex={current} score={score} display={resultDisplay} />
      <CorrectAnswers questions={quizQuestions} corrections={correctArr} display={correctAnswerDisplay} />
      <div className="buttons" id="BTNs">
        {current < indexLength && <button type="button" className="start-submit-finish-btn" style={buttonStyle} onClick={startSubmitClick}>{startSubmitButtonText}</button>}
        {current === indexLength && <button type="button" className="start-submit-finish-btn" style={buttonStyle} onClick={startSubmitClick}>Submit & Finish</button>}
        {resultDisplay && 
          <>
            <button type="button" className="review-btn" id="ReviewButton" onClick={reviewClick}>Review Quiz</button>
            <button type="button" className="restart-btn" id="RestartButton" onClick={restartClick}>Restart Quiz</button>
          </>
        }
        {correctAnswerDisplay && <button type="button" className="backToResults-btn" id="BackToResultsButton" onClick={backToResults}>Back to Results</button>}
      </div>
    </div>
  );
}

export default QuizApp;