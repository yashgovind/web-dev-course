document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  //state variables.

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    startBtn.addEventListener("click", (e) => {
      // adding removing classes , beautification part.
      startBtn.classList.add("hidden"); //hide the start button after clicking on it.
      questionContainer.classList.remove("hidden"); //clear out the content/
      nextBtn.classList.add("hidden"); // show the next button.
      questionText.innerHTML = "";
      showQuestion(questions); // function to show each question.
    });
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++; //increment the question index.
    // if its out of the index.
    showQuestion(questions); //display current question
    renderChoices(questions); //display choices.
  }); // event listener to get the next question.

  function showQuestion(questions) {
    // get the current question dynamically and display it.
    if (currentQuestionIndex>=questions.length) {
      // get the score. hide question container , display result container ,hide the nextButton, show the result container
      questionContainer.classList.add("hidden");
      nextBtn.classList.add("hidden");
      resultContainer.classList.remove("hidden");
      showResult();
      //show score.
      return;
    } 
    let currentQuestion = questions[currentQuestionIndex].question; // get the current question.
    console.log(currentQuestion);
      questionText.innerHTML = currentQuestion; // display the question.
      renderChoices(questions); //render the question.
  }

  function renderChoices(questions) {
    //flush our list html.
    choicesList.innerHTML = "";
    const currentChoice = questions[currentQuestionIndex].choices; // get the choices.
    // iterate over the choices.
    currentChoice.forEach((choice) => {
      const li = document.createElement("li"); //add li
      li.textContent = choice; //set the textcontent to the choice.

      li.addEventListener("click", (e) => {
       // add css when clicking on the li .
        if (e.target.tagName === "LI") {
          li.classList.add('selected');
        }
      });

      li.addEventListener("click", () => getAnswer(choice)); // for each list item get the choice.
      choicesList.appendChild(li); //append to parent.
    });
  }

  function getAnswer(answer) {
    //get the answer
    let currentAnswer = questions[currentQuestionIndex].answer;
    if (currentAnswer === answer) {
      score++;
    }
    nextBtn.classList.remove("hidden"); // display the next question.
  }

  function showResult() {
    scoreDisplay.innerHTML = ""; //clear out previous html../
    questionContainer.classList.add("hidden"); //hide the results
    resultContainer.classList.remove("hidden"); // show the result
    scoreDisplay.innerHTML = `<h2>${score} out of ${questions.length}</h2>`; 
  }

  restartBtn.addEventListener("click", () => {
    // flush out stuff , css and the score and indexes.
    scoreDisplay.innerHTML = ""; 
    questionText.innerHTML = "";
    resultContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    score = 0;
    currentQuestionIndex = 0;
  })

  startQuiz(); // initial rendering.

  //TODO: give each of the question as induvidual marks and calculate the total marks in all.
 
});

