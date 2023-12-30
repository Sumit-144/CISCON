//creating array of questions
const questions = [{
    question: "What is the capital of India?",
    answers: [
        { text: "Delhi", correct: false },
        { text: "Mumbai", correct: false },
        { text: "New Delhi", correct: true },
        { text: "Dharavi", correct: false },
    ]
},
{
    question: "Who is the author of book '1984'?",
    answers: [
        { text: "George Orwell", correct: true },
        { text: "Thomas Erdwin", correct: false },
        { text: "Chetan Bhagat", correct: false },
        { text: "Salman Rushdie", correct: false },
    ]
},
{
    question: "Which company developed React Js?",
    answers: [
        { text: "IBM", correct: false },
        { text: "Microsoft", correct: false },
        { text: "Google", correct: false },
        { text: "Meta", correct: true },
    ]
},{
    question: "How many states does India have?",
    answers: [
        { text: "28", correct: true },
        { text: "29", correct: false },
        { text: "27", correct: false },
        { text: "30", correct: false },
    ]
},{
    question: "Who was the first speaker of the Rajya Sabha?",
    answers: [
        { text: "Krishnamoorthy Rao", correct: false },
        { text: "Sardar Patel", correct: false },
        { text: "Sarvepalli Radhakrishnan", correct: true },
        { text: "None of the above", correct: false },
    ]
},{
    question: "First Indian woman to win an Olympic medal?",
    answers: [
        { text: "P.T Usha", correct: false },
        { text: "Karnam Malleswari", correct: true },
        { text: "P.V Sindhu", correct: false },
        { text: "Saina Nehwal", correct: false },
    ]
},{
    question: "Where is the Thol Bird sanctuary situated?",
    answers: [
        { text: "Gujarat", correct: true },
        { text: "Kerala", correct: false },
        { text: "Maharashtra", correct: false },
        { text: "Himachal Pradesh", correct: false },
    ]
},{
    question: "Who wrote the poem 'Vande Mataram'?",
    answers: [
        { text: "Rabindranath Tagore", correct: false },
        { text: "Sri Aurobindo", correct: false },
        { text: "Bankim Chandra Chatterjee", correct: true },
        { text: "Sabhyasachi Bhattacharya", correct: false },
    ]
},{
    question: "According to our preamble, we resolve to constitute India into Sovereign,Socialist,____,Democratic,Republic",
    answers: [
        { text: "Secular", correct: true },
        { text: "Communist", correct: false },
        { text: "Communal", correct: false },
        { text: "None of the above", correct: false },
    ]
}];

//Question
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}


const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + "." + currentQuestion.question;

    //displaying options
    currentQuestion.answers.forEach((answer)=>{
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);

            if(answer.correct){
                //assign value with key correct to variable
                button.dataset.correct = answer.correct;
            }
            //adding click functionality to answers
            button.addEventListener("click",selectAnswer);
    })

}

const resetState = () => {
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}


const showScore = () => {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play again";
    nextBtn.style.display = "block";
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



//calling the start Quiz function
startQuiz();
