import { useEffect, useState } from 'react';
import './Quiz.css';

function Quiz({questions, currentIndex, timeWidth, time, display}) {

    const [currentChoice, setCurrentChoice] = useState("");

    useEffect(() => {
        setCurrentChoice("");
    }, [currentIndex]);

    const minutes = Math.floor(time % 3600 / 60);
    const formatMinutes = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds >= 10 ? `${seconds}` : `0${seconds}`;

    return ((currentIndex < questions.length && display) &&
        <div className="Quiz">
            <div className="quiz-header">
                <p>{`Question ${currentIndex + 1} of ${questions.length}`}</p>
                <p className="seconds">Time: {`${formatMinutes}:${formatSeconds}`}</p>
            </div>
            <div className="timer-container">
                <div className="timer-bar" style={{width: `${timeWidth}%`}}></div>
            </div>
            <form className="quiz-form">
                {questions.map((obj, index) => {
                    return ((index === currentIndex) &&
                        <div className="question" key={`question${index + 1}`}>
                            <label className="questionLabel" htmlFor={`question${index + 1}`}>{`${index + 1}) ${obj.question}`}</label>
                            <div className="radios">
                                {obj.multipleChoices.map(choice => {
                                    return (
                                        <label key={choice} className="radio-label" htmlFor={choice} onClick={(event) => setCurrentChoice(choice)} >
                                            <input 
                                                type="radio" 
                                                checked={currentChoice === choice} 
                                                name={`question${index + 1}`} 
                                                value={choice} 
                                                readOnly
                                            />
                                            <span>{` ${choice}`}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </form>            
        </div>
    );
}

export default Quiz;