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

  // 10問ランダム抽出
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


  const choicesArea = document.getElementById("choices");
  choicesArea.innerHTML = "";


  // 選択肢をシャッフル
  const choices = [...q.choices]
    .sort(() => Math.random() - 0.5);


  choices.forEach(choice => {

    const button = document.createElement("button");

    button.textContent = choice;

    button.onclick = function(){

      if(answered) return;

      answered = true;

      checkAnswer(choice);

    };

    choicesArea.appendChild(button);

  });


  document.getElementById("result").textContent = "";

}



// 答え確認
function checkAnswer(choice){

  const correct =
    quizQuestions[currentQuestion].answer;


  if(choice === correct){

    score++;

    document.getElementById("result").textContent =
      "⭕ 正解！";

  }else{

    document.getElementById("result").textContent =
      "❌ 正解は「" + correct + "」です";

  }


  setTimeout(()=>{

    currentQuestion++;


    if(currentQuestion < quizQuestions.length){

      showQuestion();

    }else{

      showScore();

    }

  },1200);

}



// 結果表示
function showScore(){

  document.getElementById("question").textContent =
    "🎉 結果発表 🎉";


  document.getElementById("choices").innerHTML = "";


  document.getElementById("result").textContent =
    "10問中 " + score + "問正解！";


  const retryButton =
    document.createElement("button");


  retryButton.textContent =
    "もう一度挑戦する";


  retryButton.onclick = function(){

    startQuiz();

  };


  document.getElementById("choices")
    .appendChild(retryButton);

}
