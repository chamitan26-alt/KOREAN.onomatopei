document.addEventListener("DOMContentLoaded", function(){
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




// クイズ開始
startButton.onclick = function(){

    startArea.style.display = "none";
    quizArea.style.display = "block";

    startQuiz();

};




// 問題読み込み
function startQuiz(){

    score = 0;
    currentQuestion = 0;
    answered = false;

    scoreText.innerHTML =
    "現在の得点：0 / 10";


    fetch("questions.json")

    .then(response => response.json())

    .then(data => {


        questions =
        shuffle(data).slice(0,10);


        showQuestion();


    })

    .catch(error=>{


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
    +
    "問目<br>"
    +
    q.question;



    // 発音ボタン

    let soundButton =
    document.createElement("button");


    soundButton.innerHTML =
    "🔊 発音を聞く";


    soundButton.onclick=function(){


        let koreanWord =
        q.question.match(/[가-힣]+/);


        if(koreanWord){


            let utterance =
            new SpeechSynthesisUtterance(
                koreanWord[0]
            );


            utterance.lang =
            "ko-KR";


            speechSynthesis.speak(
                utterance
            );

        }


    };


    questionText.appendChild(
        document.createElement("br")
    );


    questionText.appendChild(
        soundButton
    );




    choicesBox.innerHTML = "";


    let choices =
    shuffle([...q.choices]);



    choices.forEach(choice=>{


        let button =
        document.createElement("button");


        button.innerHTML =
        choice;



        button.onclick=function(){


            if(answered)return;


            answered=true;


            checkAnswer(
                choice,
                button
            );


        };



        choicesBox.appendChild(button);


    });



}




// 答え確認
function checkAnswer(choice,button){


    let q =
    questions[currentQuestion];



    let buttons =
    choicesBox.querySelectorAll("button");



    buttons.forEach(btn=>{


        btn.disabled=true;



        if(btn.innerHTML === q.answer){


            btn.style.background =
            "#90ee90";


        }


    });



    if(choice === q.answer){


        score++;


        resultText.innerHTML =
        "🎉 正解！";



    }else{


        button.style.background =
        "#ff9999";


        resultText.innerHTML =
        "❌ 残念… 正解は「"
        +
        q.answer
        +
        "」";


    }




    // 解説

    resultText.innerHTML +=


    "<br><br>📖 解説<br>"
    +
    q.meaning

    +

    "<br><br>📝 例文<br>"
    +
    q.example

    +

    "<br>"
    +
    q.translation;



    scoreText.innerHTML =

    "現在の得点："

    +

    score

    +

    " / 10";





    let next =
    document.createElement("button");



    next.innerHTML =
    "次の問題へ";



    next.onclick=function(){


        currentQuestion++;



        if(currentQuestion < questions.length){


            showQuestion();



        }else{


            showResult();


        }



    };



    nextArea.appendChild(next);



}





// 結果表示
function showResult(){


    questionText.innerHTML =
    "終了！";


    choicesBox.innerHTML="";


    let rate =
    Math.round(
        score / 10 * 100
    );



    resultText.innerHTML =


    "あなたの得点は "

    +

    score

    +

    " / 10 点でした✨"

    +

    "<br>正解率："

    +

    rate

    +

    "%";



    nextArea.innerHTML="";



    let retry =
    document.createElement("button");



    retry.innerHTML =
    "もう一度挑戦する";



    retry.onclick=function(){


        startQuiz();


    };



    nextArea.appendChild(retry);



}




// シャッフル
function shuffle(array){


    return array.sort(
        ()=>Math.random()-0.5
    );


}
});
