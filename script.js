let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// 問題読み込み
fetch("questions.json")
.then(response => response.json())
.then(data => {

    questions = data;

    document
    .getElementById("startButton")
    .addEventListener("click", startQuiz);

})
.catch(error => {

    console.log("読み込みエラー", error);

});


// クイズ開始
function startQuiz(){

    document.getElementById("startButton").style.display = "none";

    score = 0;
    currentQuestion = 0;

    document.getElementById("score").innerHTML =
    "スコア：0 / 10";

    shuffleQuestions();

    showQuestion();

}


// 問題シャッフル
function shuffleQuestions(){

    questions.sort(() => Math.random() - 0.5);

}


// 問題表示
function showQuestion(){

    answered = false;

    let q = questions[currentQuestion];


    document.getElementById("question").innerHTML =
    (currentQuestion + 1) + "問目<br><br>" + q.question;


    let choicesHTML = "";


    q.choices.forEach(function(choice,index){

        choicesHTML +=
        '<button class="choiceButton" data-index="' + index + '">' +
        choice +
        '</button>';

    });


    document.getElementById("choices").innerHTML = choicesHTML;


    document.querySelectorAll(".choiceButton")
    .forEach(function(button){

        button.addEventListener("click",function(){

            let index = this.dataset.index;

            checkAnswer(q.choices[index]);

        });

    });


    document.getElementById("nextArea").style.display = "none";

}


// 答え確認
function checkAnswer(choice){

    if(answered){
        return;
    }


    answered = true;


    let q = questions[currentQuestion];


    if(choice === q.answer){

        score++;

        alert("正解です✨");

    }else{

        alert("不正解\n正解は「" + q.answer + "」です");

    }


    document.getElementById("score").innerHTML =
    "スコア：" + score + " / 10";


    document.getElementById("nextArea").style.display =
    "block";

}


// 次の問題
function nextQuestion(){

    currentQuestion++;


    if(currentQuestion >= 10){

        showResult();

    }else{

        showQuestion();

    }

}


// 結果表示
function showResult(){

    document.getElementById("question").innerHTML =
    "🎉 チャレンジ終了！";


    document.getElementById("choices").innerHTML =
    "";


    document.getElementById("nextArea").style.display =
    "none";


    document.getElementById("result").innerHTML =

    "<h3>結果</h3>" +
    "<p>10問中 " + score + "問正解でした！</p>";

}
fetch("./questions.json")
.then(response => {

    if (!response.ok) {
        throw new Error("questions.jsonが読み込めません");
    }

    return response.json();

})
.then(data => {

    questions = data;

    document
    .getElementById("startButton")
    .addEventListener("click", startQuiz);

})
.catch(error => {

    alert("問題データの読み込みに失敗しました");

    console.log(error);

});
