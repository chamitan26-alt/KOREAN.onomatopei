let questions = [];
let quizQuestions = [];

let currentQuestion = 0;
let score = 0;
let answered = false;

let currentKoreanWord = "";


const startButton = document.getElementById("startButton");
const startArea = document.getElementById("startArea");
const quizArea = document.getElementById("quizArea");

const questionText = document.getElementById("question");
const choicesArea = document.getElementById("choices");
const resultText = document.getElementById("result");
const explanationText = document.getElementById("explanation");

const nextButton = document.getElementById("nextButton");
const speakButton = document.getElementById("speakButton");
const scoreText = document.getElementById("score");



// データ読み込み

fetch("questions.json")
.then(response => response.json())
.then(data => {

    questions = data;

})
.catch(error => {

    console.log("読み込みエラー", error);

});




// スタート

startButton.onclick = function(){

    startArea.style.display = "none";

    quizArea.style.display = "block";

    startQuiz();

};




// 10問作成

function startQuiz(){

    quizQuestions = [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0,10);


    currentQuestion = 0;

    score = 0;


    scoreText.innerHTML =
    "現在の得点：0 / 10";


    showQuestion();

}




// 問題表示

function showQuestion(){

    answered = false;


    resultText.innerHTML = "";

    explanationText.innerHTML = "";

    nextButton.style.display = "none";



    let q = quizQuestions[currentQuestion];



    questionText.innerHTML =
    (currentQuestion + 1)
    + "問目 / 10問<br><br>"
    + q.question;



    currentKoreanWord =
    q.question.split(" の意味")[0];



    choicesArea.innerHTML = "";



    let choices = [...q.choices];


    choices.sort(() => Math.random() - 0.5);



    choices.forEach(choice => {


        let button = document.createElement("button");


        button.innerHTML = choice;


        button.onclick = function(){

            checkAnswer(choice,q);

        };


        choicesArea.appendChild(button);


    });

}



// 発音

speakButton.onclick = function(){


    const speech =
    new SpeechSynthesisUtterance();


    speech.text = currentKoreanWord;

    speech.lang = "ko-KR";

    speech.rate = 0.8;


    speechSynthesis.speak(speech);


};




// 答え確認

function checkAnswer(choice,q){


    if(answered) return;


    answered = true;



    if(choice === q.answer){


        score++;


        scoreText.innerHTML =
        "現在の得点：" + score + " / 10";


        resultText.innerHTML =
        "⭕ 正解！";


    }else{


        resultText.innerHTML =
        "❌ 不正解<br>正解：" + q.answer;


    }



    explanationText.innerHTML =
    "📖 解説<br>" +
    (q.explanation || "解説なし");



    nextButton.style.display = "block";


}




// 次へ

nextButton.onclick = function(){


    currentQuestion++;



    if(currentQuestion < quizQuestions.length){


        showQuestion();


    }else{


        quizArea.innerHTML =

        "<h2>終了！</h2>" +

        "<p>得点：" +
        score +
        " / 10</p>" +

        "<button onclick='location.reload()'>"
        +
        "もう一度挑戦する"
        +
        "</button>";

    }

};
