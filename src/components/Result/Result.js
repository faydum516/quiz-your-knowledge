import './Result.css';

function Result({questions, score, display}) {

    const resultNote = score === 10 ? "You got a perfect score, congrats!" : 
        score >= 8 && score < 10 ? "You did very well on the quiz, good job!" :
        score === 7 ? "You did fine on the quiz." :
        score === 6 ? "You barely passed." :
        "You didn't pass the quiz, better luck next time.";

    const resultHeaderStyle = {fontSize: "1.0625em", fontWeight: "700", textAlign: "center", margin: "10px 0 15px 0"};

    return (display &&
        <div className="QuizResults">
            <h6 style={resultHeaderStyle}>Quiz Results</h6>
            <table>
                <tbody>
                <tr>
                    <td className="left-cell">Number of Correct Answers:</td>
                    <td className="right-cell">{score}</td>
                </tr>
                <tr>
                    <td className="left-cell">Total Number of Questions:</td>
                    <td className="right-cell">{questions.length}</td>
                </tr>
                <tr>
                    <td className="left-cell">Passing Score:</td>
                    <td className="right-cell">60% (6/10)</td>
                </tr>
                <tr>
                    <td className="left-cell">Score:</td>
                    <td className="right-cell">{score / questions.length * 100}% ({score}/{questions.length})</td>
                </tr>
                </tbody>
            </table>
            <p className="result-note">{resultNote}</p> 
        </div>
    );
}

export default Result;