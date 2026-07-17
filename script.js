let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// 問題データ読み込み
fetch("questions.json")
    .then(response => response.json())
    .then(data => {

        questions = data;

        document.getElementById("startButton").addEventListener("click", startQuiz);

    })
    .catch(error => {
        console.log("問題読み込みエラー", error);
    });


// スタート
function startQuiz(){

    document.getElementById("startButton").style.display = "none";

    score = 0;
    currentQuestion = 0;

    document.getElementById("score").innerHTML =
    "スコア：0点";

    shuffleQuestions();

    showQuestion();

}


// 問題をシャッフル
function shuffleQuestions(){

    questions.sort(() => Math.random() - 0.5);

}


// 問題表示
function showQuestion(){

    answered = false;

    let q = questions[currentQuestion];


    document.getElementById("question").innerHTML =
    (currentQuestion + 1) + "問目<br>" + q.question;


    let choicesHTML = "";


    q.choices.forEach(choice => {

        choicesHTML +=
        `<button onclick="checkAnswer('${choice}')">${choice}</button>`;

    });


    document.getElementById("choices").innerHTML = choicesHTML;


    document.getElementById("nextArea").style.display = "none";

}


// 答え確認
function checkAnswer(choice){

    if(answered) return;

    answered = true;


    let q = questions[currentQuestion];


    if(choice === q.answer){

        score++;

        alert("正解✨");

    }else{

        alert("正解は「" + q.answer + "」です");

    }


    document.getElementById("score").innerHTML =
    "スコア：" + score + " / 10";


    document.getElementById("nextArea").style.display = "block";

}


// 次へ
function nextQuestion(){

    currentQuestion++;


    if(currentQuestion >= 10){

        showResult();

    }else{

        showQuestion();

    }

}


// 結果
function showResult(){

    document.getElementById("question").innerHTML =
    "🎉終了！";


    document.getElementById("choices").innerHTML =
    "";


    document.getElementById("nextArea").style.display =
    "none";


    document.getElementById("result").innerHTML =
    "<h3>結果</h3>" +
    "<p>10問中 " + score + "問正解！</p>";

}
