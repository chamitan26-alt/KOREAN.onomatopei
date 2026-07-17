let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


const startButton = document.getElementById("startButton");
const startArea = document.getElementById("startArea");
const quizArea = document.getElementById("quizArea");

const questionText = document.getElementById("question");
const choicesArea = document.getElementById("choices");
const resultText = document.getElementById("result");
const explanationText = document.getElementById("explanation");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("score");


// データ読み込み
fetch("questions.json")
.then(response => response.json())
.then(data => {

    questions = data;

})
.catch(error => {

    console.log("データ読み込みエラー", error);

});



// スタート
startButton.onclick = function(){

    startArea.style.display = "none";
    quizArea.style.display = "block";

    currentQuestion = 0;
    score = 0;

    showQuestion();

};



// 問題表示
function showQuestion(){

    answered = false;

    resultText.innerHTML = "";
    explanationText.innerHTML = "";

    nextButton.style.display = "none";


    let q = questions[currentQuestion];


    questionText.innerHTML =
    (currentQuestion + 1) +
    "問目<br><br>" +
    q.question;



    choicesArea.innerHTML = "";



    // 選択肢をコピーしてシャッフル
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




// 答え確認
function checkAnswer(choice,q){


    if(answered) return;


    answered = true;


    if(choice === q.answer){

        score++;

        resultText.innerHTML =
        "⭕ 正解！";


    }else{


        resultText.innerHTML =
        "❌ 不正解<br>正解：" + q.answer;


    }



    // 解説表示
    if(q.explanation){

        explanationText.innerHTML =
        "📖 解説<br>" +
        q.explanation;

    }else{

        explanationText.innerHTML =
        "📖 解説はありません";

    }



    nextButton.style.display = "block";


}





// 次の問題
nextButton.onclick = function(){


    currentQuestion++;


    if(currentQuestion < questions.length){


        showQuestion();


    }else{


        quizArea.innerHTML =

        "<h2>終了！</h2>" +

        "<p>あなたの点数：" +
        score +
        " / " +
        questions.length +
        "</p>";


    }


};
