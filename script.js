let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const resultText = document.getElementById("result");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("start");


// スタート
startButton.addEventListener("click", startQuiz);


function startQuiz(){

    score = 0;
    currentQuestion = 0;

    startButton.style.display = "none";
    resultText.innerHTML = "";

    fetch("questions.json")
    .then(response => response.json())
    .then(data => {

        questions = shuffle(data).slice(0,10);

        showQuestion();

    })
    .catch(error => {

        questionText.innerHTML =
        "データを読み込めませんでした";

        console.log(error);

    });

}


// 問題表示
function showQuestion(){

    answered = false;

    nextButton.style.display = "none";

    let q = questions[currentQuestion];


    questionText.innerHTML =
    (currentQuestion + 1) + "問目<br>" + q.question;


    choicesBox.innerHTML = "";


    let choices = shuffle([...q.choices]);


    choices.forEach(choice => {

        let button = document.createElement("button");

        button.innerHTML = choice;

        button.className = "choice";


        button.onclick = function(){

            if(answered) return;

            answered = true;

            checkAnswer(choice);

        };


        choicesBox.appendChild(button);

    });

}



// 答え確認
function checkAnswer(choice){

    let q = questions[currentQuestion];


    let buttons =
    document.querySelectorAll(".choice");


    buttons.forEach(btn=>{

        if(btn.innerHTML === q.answer){

            btn.style.background="#90ee90";

        }


        if(btn.innerHTML === choice &&
           choice !== q.answer){

            btn.style.background="#ff9999";

        }

        btn.disabled=true;

    });



    if(choice === q.answer){

        score++;

        resultText.innerHTML="正解！🎉";

    }else{

        resultText.innerHTML=
        "不正解… 正解は「"+
        q.answer+"」";

    }


    nextButton.style.display="block";


}



// 次へ
nextButton.addEventListener("click",()=>{


    currentQuestion++;


    if(currentQuestion < questions.length){

        showQuestion();

    }else{


        questionText.innerHTML=
        "終了！";


        choicesBox.innerHTML="";


        resultText.innerHTML=
        score+" / 10 問 正解！";


        nextButton.style.display="none";

        startButton.style.display="block";

        startButton.innerHTML="もう一度挑戦";

    }


});



// シャッフル
function shuffle(array){

    return array.sort(
        ()=>Math.random()-0.5
    );

}
