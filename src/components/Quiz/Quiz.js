import { useState } from 'react';
import './Quiz.css';

function Quiz({questions, currentIndex, progressWidth, time, display}) {

    const [currentChoice, setCurrentChoice] = useState("");

    return ((currentIndex < questions.length && display) &&
        <div className="Quiz">
            <div className="timer-container">
                <div className="timer-bar" style={{width: `${time}%`}}></div>
            </div>
            <div className="quiz-progress">
                <div className="quiz-progress-container">
                    <div className="quiz-progress-bar" style={{width: `${progressWidth}%`}}></div>
                </div>
                <div className="progress-minmax">
                    <p className="progress-minvalue">0</p>
                    <p className="progress-maxvalue">100</p>
                </div>
            </div>
            <form className="quiz-form">
                {questions.map((obj, index) => {
                    return ((index === currentIndex) &&
                        <div className="question" key={`question${index + 1}`}>
                            <label className="questionLabel" htmlFor={`question${index + 1}`}>{`Q${index + 1}) ${obj.question}`}</label>
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