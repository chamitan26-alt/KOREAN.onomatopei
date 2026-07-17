window.onerror = function(message, source, lineno) {
  alert(message + "（" + lineno + "行目）");
};
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
function checkAnswer(selected) {

  const q = quiz[currentQuestion];

  const result = document.getElementById("result");

  if (selected === q.answer) {
    score++;

    result.innerHTML =
      `⭕ 正解！<br><br>
      <strong>${q.word}</strong><br>
      ${q.example_ko}<br><br>
      ${q.example_ja}`;

  } else {

    result.innerHTML =
      `❌ 不正解<br><br>
      正解：${q.choices[q.answer]}<br><br>
      ${q.example_ko}<br><br>
      ${q.example_ja}`;

  }

  document.getElementById("nextBtn").style.display = "block";

}

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= quiz.length) {

    document.querySelector(".container").innerHTML = `
      <h1>🎉 お疲れさまでした！</h1>

      <h2>${score} / ${quiz.length} 点</h2>

      <button onclick="location.reload()">
        もう一度挑戦
      </button>
    `;

    return;
  }

  showQuestion();

}
