import './Result.css';

function Result({questions, score, display}) {

    const resultNote = score === 10 ? "You got a perfect score, congrats!" : 
        score >= 8 && score < 10 ? "You did very well on the quiz, good job!" :
        score === 7 ? "You did fine on the quiz." :
        score === 6 ? "You barely passed." :
        "You didn't pass the quiz, better luck next time.";

    return (display &&
        <fieldset className="quiz-results">
            <legend style={{fontSize: "1.0625em", fontWeight: "700"}}>Quiz Results</legend>
            <div className="quiz-result">
                <label htmlFor="correct-answers">Number of Correct Answers: </label>
                <input className="result-input"  type="text" id="CorrectAnswers" name="correct-answers" value={score} disabled />
            </div> 
            <div className="quiz-result">
                <label htmlFor="num-questions">Total Number of Questions: </label>
                <input className="result-input" type="text" id="NumQuestions" name="num-questions" value={questions.length} disabled />
            </div>         
            <div className="quiz-result">
                <label htmlFor="passing-score">Passing Score: </label>
                <input className="result-input"  type="text" id="PassingScore" name="passing-score" value="60% (6/10)" disabled />
            </div> 
            <div className="quiz-result">
                <label htmlFor="score">Score: </label>
                <input className="result-input" type="text" id="QuizScore" name="score" value={`${score / questions.length * 100}% (${score}/${questions.length})`} disabled />
            </div>
            <p className="result-note">{resultNote}</p>
        </fieldset>
    );
}

export default Result;