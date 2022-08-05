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
                    <td>Number of Correct Answers:</td>
                    <td>{score}</td>
                </tr>
                <tr>
                    <td>Total Number of Questions:</td>
                    <td>{questions.length}</td>
                </tr>
                <tr>
                    <td>Passing Score:</td>
                    <td>60% (6/10)</td>
                </tr>
                <tr>
                    <td>Score:</td>
                    <td>{score / questions.length * 100}% ({score}/{questions.length})</td>
                </tr>
                </tbody>
            </table>
            <p className="result-note">{resultNote}</p> 
        </div>
    );
}

export default Result;