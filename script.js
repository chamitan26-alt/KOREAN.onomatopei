let questions = [];
let quiz = [];
let currentQuestion = 0;
let score = 0;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;

    // ランダムに10問選択
    quiz = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    showQuestion();
  })
  .catch(error => {
    console.error("questions.jsonの読み込みに失敗しました", error);
  });

function showQuestion() {

  const q = quiz[currentQuestion];

  document.getElementById("questionNumber").textContent =
    `第${currentQuestion + 1}問 / ${quiz.length}`;

  document.getElementById("word").textContent = q.word;

  document.getElementById("result").innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  // 正解位置をランダムにする
  const choices = [...q.choices];
  choices.sort(() => Math.random() - 0.5);

  const correctIndex = choices.indexOf(q.choices[q.answer]);

  q.currentAnswer = correctIndex;

  choices.forEach((choice, index) => {

    const button = document.createElement("button");

    button.textContent = choice;

    button.onclick = () => checkAnswer(index);

    choicesDiv.appendChild(button);

  });

}

function checkAnswer(selected) {

  const q = quiz[currentQuestion];

  const result = document.getElementById("result");

  // ボタンを押したら二度押し防止
  document.querySelectorAll("#choices button").forEach(btn => {
    btn.disabled = true;
  });

  if (selected === q.currentAnswer) {

    score++;

    result.innerHTML = `
      <h3>⭕ 正解！</h3>
      <p><strong>${q.word}</strong></p>
      <p>${q.example_ko}</p>
      <p>${q.example_ja}</p>
    `;

  } else {

    result.innerHTML = `
      <h3>❌ 不正解</h3>
      <p>正解：<strong>${q.choices[q.answer]}</strong></p>
      <p>${q.example_ko}</p>
      <p>${q.example_ja}</p>
    `;

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
