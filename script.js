let questions = [];
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




// 問題読み込み

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
    (currentQuestion + 1)
    + "問目<br><br>"
    + q.question;




    // 韓国語部分を保存

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








// 発音ボタン

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


        resultText.innerHTML =
        "⭕ 正解！";


    }else{


        resultText.innerHTML =
        "❌ 不正解<br>正解：" + q.answer;


    }




    if(q.explanation){


        explanationText.innerHTML =
        "📖 解説<br>"
        + q.explanation;


    }




    nextButton.style.display = "block";


}








// 次へ

nextButton.onclick = function(){


    currentQuestion++;



    if(currentQuestion < questions.length){


        showQuestion();


    }else{


        quizArea.innerHTML =

        "<h2>終了！</h2>" +

        "<p>得点：" +
        score +
        " / " +
        questions.length +
        "</p>";


    }


};
