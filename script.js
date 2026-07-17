let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


const startButton = document.getElementById("startButton");
const startArea = document.getElementById("startArea");
const quizArea = document.getElementById("quizArea");

const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const resultText = document.getElementById("result");
const nextArea = document.getElementById("nextArea");
const scoreText = document.getElementById("score");



// スタートボタン
startButton.onclick = function(){

    startArea.style.display = "none";
    quizArea.style.display = "block";

    loadQuiz();

};



// 問題読み込み
function loadQuiz(){

    score = 0;
    currentQuestion = 0;
    answered = false;

    scoreText.innerHTML =
    "現在の得点：0 / 10";


    fetch("questions.json")

    .then(response => response.json())

    .then(data => {

        questions = shuffle(data).slice(0,10);

        showQuestion();

    })

    .catch(error => {

        questionText.innerHTML =
        "問題データを読み込めませんでした";

        console.log(error);

    });

}



// 問題表示
function showQuestion(){

    answered = false;

    resultText.innerHTML = "";
    nextArea.innerHTML = "";


    let q = questions[currentQuestion];


    questionText.innerHTML =
    (currentQuestion + 1)
    + "問目<br>"
    + q.question;



    // 発音ボタン

    let soundButton = document.createElement("button");

    soundButton.innerHTML =
    "🔊 韓国語の発音";

    soundButton.onclick = function(){

        let korean = q.question.match(/[가-힣]+/);

        if(korean){

            let utter =
            new SpeechSynthesisUtterance(korean[0]);

            utter.lang = "ko-KR";

            speechSynthesis.speak(utter);

        }

    };


    questionText.appendChild(
        document.createElement("br")
    );

    questionText.appendChild(soundButton);



    choicesBox.innerHTML = "";


    let choices =
    shuffle([...q.choices]);



    choices.forEach(choice => {


        let button =
        document.createElement("button");


        button.innerHTML = choice;


        button.onclick = function(){

            if(answered)return;

            answered = true;

            checkAnswer(choice, button);

        };


        choicesBox.appendChild(button);


    });


}



// 答え確認
function checkAnswer(choice, button){

    let q = questions[currentQuestion];


    let buttons =
    choicesBox.querySelectorAll("button");


    buttons.forEach(btn => {

        btn.disabled = true;


        if(btn.innerHTML === q.answer){

            btn.style.backgroundColor =
            "#90ee90";

        }

    });



    if(choice === q.answer){

        score++;

        resultText.innerHTML =
        "🎉 正解！";


    }else{

        button.style.backgroundColor =
        "#ff9999";


        resultText.innerHTML =
        "❌ 残念… 正解は「"
        + q.answer
        + "」";

    }



    resultText.innerHTML +=

    "<br><br>📖 解説<br>"
    + q.meaning

    + "<br><br>📝 例文<br>"
    + q.example

    + "<br>"
    + q.translation;



    scoreText.innerHTML =
    "現在の得点："
    + score
    + " / 10";



    let nextButton =
    document.createElement("button");


    nextButton.innerHTML =
    "次の問題へ";



    nextButton.onclick = function(){


        currentQuestion++;


        if(currentQuestion < questions.length){

            showQuestion();

        }else{

            showResult();

        }

    };


    nextArea.appendChild(nextButton);


}




// 結果
function showResult(){


    questionText.innerHTML =
    "🎊 終了！";


    choicesBox.innerHTML = "";


    let rate =
    Math.round(score / 10 * 100);


    resultText.innerHTML =

    "あなたの得点は "
    + score
    + " / 10 点でした✨"
    + "<br>"
    + "正解率："
    + rate
    + "%";



    nextArea.innerHTML = "";


    let retryButton =
    document.createElement("button");


    retryButton.innerHTML =
    "もう一度挑戦する";


    retryButton.onclick = function(){

        loadQuiz();

    };


    nextArea.appendChild(retryButton);


}



// シャッフル
function shuffle(array){

    return array.sort(
        ()=>Math.random()-0.5
    );

}
