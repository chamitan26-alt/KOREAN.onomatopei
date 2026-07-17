let questions = [];
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// 問題読み込み
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    startQuiz();
  });


// クイズ開始
function startQuiz() {

  currentQuestion = 0;
  score = 0;

  quizQuestions = [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  showQuestion();
}


// 問題表示
function showQuestion() {

  answered = false;

  const q = quizQuestions[currentQuestion];

  document.getElementById("question").textContent =
    q.question;


  const choicesArea =
    document.getElementById("choices");

  choicesArea.innerHTML = "";


  const choices = [...q.choices]
    .sort(() => Math.random() - 0.5);


  choices.forEach(choice => {

    const button =
      document.createElement("button");

    button.textContent = choice;

    button.onclick = function(){

      if(answered) return;

      answered = true;

      checkAnswer(choice);

    };


    choicesArea.appendChild(button);

  });


  document.getElementById("result").innerHTML = "";

}



// 答え確認
function checkAnswer(choice){

  const q = quizQuestions[currentQuestion];

  if(choice === q.answer){

    score++;

    document.getElementById("result").innerHTML =
    `
    <h3>⭕ 正解！</h3>

    <p>韓国語：${q.question}</p>

    <p>発音：${q.pronunciation}</p>

    <p>意味：${q.meaning}</p>

    <p>例文：<br>
    ${q.example}
    </p>

    <p>${q.translation}</p>
    `;


  }else{


    document.getElementById("result").innerHTML =
    `
    <h3>❌ 不正解</h3>

    <p>正解：${q.answer}</p>

    <p>発音：${q.pronunciation}</p>

    <p>意味：${q.meaning}</p>

    <p>例文：<br>
    ${q.example}
    </p>

    <p>${q.translation}</p>
    `;

  }


  showNextButton();

}



// 次へボタン
function showNextButton(){

  const button =
    document.createElement("button");


  if(currentQuestion < quizQuestions.length - 1){

    button.textContent =
      "次の問題へ";


    button.onclick = function(){

      currentQuestion++;

      showQuestion();

    };


  }else{


    button.textContent =
      "結果を見る";


    button.onclick = function(){

      showScore();

    };

  }


  document.getElementById("choices")
    .innerHTML = "";


  document.getElementById("choices")
    .appendChild(button);

}



// 結果表示
function showScore(){

  document.getElementById("question")
    .textContent =
    "🎉 結果発表 🎉";


  document.getElementById("result")
    .innerHTML =
    `
    <h2>${score} / 10 問正解！</h2>
    `;


  const button =
    document.createElement("button");


  button.textContent =
    "もう一度挑戦する";


  button.onclick = function(){

    startQuiz();

  };


  document.getElementById("choices")
    .innerHTML = "";


  document.getElementById("choices")
    .appendChild(button);

}
