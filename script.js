let questions = [];
let currentQuestion = 0;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  document.getElementById("word").textContent =
    questions[currentQuestion].word;
}
