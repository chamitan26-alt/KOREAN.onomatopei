let questions = [];

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    startQuiz();
  });

function startQuiz() {
  console.log(questions);
}
