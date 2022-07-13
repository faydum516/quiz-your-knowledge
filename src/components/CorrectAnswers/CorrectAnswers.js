import './CorrectAnswers.css';
import { useState, useEffect, useCallback } from 'react';
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs';
import {FiCheck, FiX} from 'react-icons/fi';

function CorrectAnswers({questions, corrections, display}) {

    const [corrAnsIndex, setCorrAnsIndex] = useState(0);

    const arrowPress = useCallback((event) => {
        const {key} = event;
        if (key === "ArrowLeft") {
            setCorrAnsIndex(corrAnsIndex => corrAnsIndex === 0 ? 9 : corrAnsIndex - 1);
        }        
        if (key === "ArrowRight") {
            setCorrAnsIndex(corrAnsIndex => corrAnsIndex === 9 ? 0 : corrAnsIndex + 1);
        }
    }, []);
    
    useEffect(() => {
        display && window.addEventListener("keydown", arrowPress);
        setCorrAnsIndex(0);
        return () => {
            window.removeEventListener("keydown", arrowPress);
        }
    }, [display, arrowPress]);

    const leftArrowClick = () => {
        setCorrAnsIndex(corrAnsIndex === 0 ? 9 : corrAnsIndex - 1);
    }

    const rightArrowClick = () => {
        setCorrAnsIndex(corrAnsIndex === 9 ? 0 : corrAnsIndex + 1);
    }

    return (display &&
        <div className="CorrectedQuiz">
            <form className="CorrectedQuestion">
                {questions.map((obj, index) => {
                    return (index === corrAnsIndex &&
                        <div className="question" key={`question${index + 1}`}>
                            <label className="questionLabel" htmlFor={`question${index + 1}`}>{`Q${index + 1}) ${obj.question}`}</label>
                            <div className="radios">
                                {obj.multipleChoices.map(choice => {
                                    return ((choice === obj.correctAnswer) ? 
                                        <label key={choice} className="correct-incorrect" htmlFor={choice}>
                                            <input type="radio" name={`question${index + 1}`} value={choice} checked disabled />
                                            <span>{` ${choice}`}</span>
                                        </label> : 
                                        <label key={choice} className="correct-incorrect" htmlFor={choice}>
                                            <input type="radio" name={`question${index + 1}`} value={choice} disabled />
                                            <span>{` ${choice}`}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {corrections[index] && <p className="answer-note"><FiCheck className="answer-mark right-mark" />You got that right.</p>}
                            {!corrections[index] && <p className="answer-note"><FiX className="answer-mark wrong-mark" />You didn't get that right.</p>}
                        </div>
                    );
                })}
            </form>
            <div className="arrows">            
                <BsFillArrowLeftSquareFill className="arrow left" onClick={leftArrowClick} />
                <p>{corrAnsIndex + 1}/{questions.length}</p>
                <BsFillArrowRightSquareFill className="arrow right" onClick={rightArrowClick} />
            </div>
        </div>
    );
}

export default CorrectAnswers;