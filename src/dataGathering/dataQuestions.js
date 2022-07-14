import axios from 'axios';

const quizQuestions = Array(10);

axios.get('https://quiz-your-knowledge-backend.herokuapp.com/v2/posts')
    .then(response => {
        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor((Math.random() * response.data.length)); // An index number is selected randomly.
            let randomObj = response.data.splice(randomIndex, 1).shift(); // An obj in the fetched data array is picked at random.
            quizQuestions[i] = randomObj;
        }
    })
    .catch(error => {
        console.error(error);
    });

export default quizQuestions;