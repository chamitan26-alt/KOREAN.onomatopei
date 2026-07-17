let questions = [];
let quiz = [];
let currentQuestion = 0;
let score = 0;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;

    // ランダムに10問選ぶ
    quiz = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    showQuestion();
  });

function showQuestion() {

  document.getElementById("questionNumber").textContent =
    `第${currentQuestion + 1}問 / 10`;

  document.getElementById("word").textContent =
    quiz[currentQuestion].word;

  document.getElementById("result").innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";

  const choicesDiv = document.getElementById("choices");

  choicesDiv.innerHTML = "";

  quiz[currentQuestion].choices.forEach((choice, index) => {

    const button = document.createElement("button");

    button.textContent = choice;

    button.onclick = () => checkAnswer(index);

    choicesDiv.appendChild(button);

  });

}
