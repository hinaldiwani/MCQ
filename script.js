const quizData = [
  {
    question: "What is the capital of France?",
    options: { A: "London", B: "Paris", C: "Rome", D: "Madrid" },
    answer: "B"
  },
  {
    question: "Which language is used for web apps?",
    options: { A: "Python", B: "Java", C: "PHP", D: "All of the above" },
    answer: "D"
  },
  {
    question: "Who developed Python?",
    options: { A: "Dennis Ritchie", B: "Bjarne Stroustrup", C: "Guido van Rossum", D: "James Gosling" },
    answer: "C"
  },
  {
    question: "Python is known as?",
    options: { A: "A compiled language", B: "An interpreted language", C: "A machine language", D: "An assembly language" },
    answer: "B"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: { A: "Anchor Tag", B: "Link Tag", C: "Href Tag", D: "Image Tag" },
    answer: "A"
  },
  {
    question: "Which company developed Java?",
    options: { A: "Microsoft", B: "Sun Microsystems", C: "Google", D: "Apple" },
    answer: "B"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: { A: "font-style", B: "color", C: "text-decoration", D: "background-color" },
    answer: "B"
  }
];

let currentQuestion = 0;
const userAnswers = {};

const quizContainer = document.getElementById("quiz");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const resultsContainer = document.getElementById("results");

function loadQuestion() {
  const q = quizData[currentQuestion];
  const optionsHTML = Object.keys(q.options).map(
    key => `
      <label>
        <input type="radio" name="question" value="${key}" ${userAnswers[currentQuestion] === key ? "checked" : ""}>
        ${key}. ${q.options[key]}
      </label>
    `
  ).join("");

  quizContainer.innerHTML = `
    <div class="question">${currentQuestion + 1}. ${q.question}</div>
    <div class="options">${optionsHTML}</div>
  `;

  prevButton.disabled = currentQuestion === 0;
  nextButton.textContent = currentQuestion === quizData.length - 1 ? "Submit" : "Next";
}

function saveAnswer() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = selected.value;
  }
}

function showResults() {
  let score = 0;
  quizData.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });
  quizContainer.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";
  resultsContainer.textContent = `You scored ${score} out of ${quizData.length}`;
}

nextButton.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResults();
  }
});

prevButton.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

// Initial load
loadQuestion();
