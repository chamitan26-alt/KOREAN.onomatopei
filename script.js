let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let loaded = false;


// 問題データ読み込み
fetch("questions.json")
.then(response => response.json())
.then(data => {

    questions = data;
    loaded = true;

    console.log("読み込み完了：" + questions.length + "問");

})
.catch(error => {

    console.log("読み込みエラー", error);

});



// スタートボタン
document.getElementById("startButton").onclick = function(){


    if(!loaded){

        alert("問題データを読み込み中です。少し待ってください");

        return;

    }


    document.getElementById("startArea").style.display = "none";

    document.getElementById("quizArea").style.display = "block";


    score = 0;

    currentQuestion = 0;


    questions.sort(function(){

        return Math.random() - 0.5;

    });


    showQuestion();


};



// 問題表示
function showQuestion(){


    answered = false;


    let q = questions[currentQuestion];


    document.getElementById("score").innerHTML =

    "現在の得点：" + score + " / 10";


    document.getElementById("question").innerHTML =

    (currentQuestion + 1) +
    "問目<br><br>" +
    q.question +
    "<br><br>" +
    '<button id="voiceButton">🔊 発音を聞く</button>';



    // 発音ボタン
    document.getElementById("voiceButton").onclick = function(){


        let word = q.question.split(" の")[0];


        let speech = new SpeechSynthesisUtterance(word);


        speech.lang = "ko-KR";

        speech.rate = 0.8;

        speech.pitch = 1;


        window.speechSynthesis.speak(speech);


    };



    let choices = [...q.choices];


    choices.sort(function(){

        return Math.random() - 0.5;

    });


    let html = "";


    choices.forEach(function(choice){


        html +=

        '<button class="choiceButton">' +

        choice +

        '</button>';


    });


    document.getElementById("choices").innerHTML = html;


    document.getElementById("result").innerHTML = "";


    document.getElementById("nextArea").innerHTML = "";



    document.querySelectorAll(".choiceButton")
    .forEach(function(button){


        button.onclick = function(){

            checkAnswer(this);

        };
// 答え確認
function checkAnswer(button){


    if(answered){

        return;

    }


    answered = true;


    let q = questions[currentQuestion];


    let selected = button.textContent;


    document.querySelectorAll(".choiceButton")
    .forEach(function(btn){


        btn.disabled = true;


        if(btn.textContent === q.answer){

            btn.classList.add("correct");

        }


    });



    let resultText = "";



    if(selected === q.answer){


        score++;


        button.classList.add("correct");


        resultText = "✨ 正解！";


    }else{


        button.classList.add("wrong");


        resultText =

        "💡 正解は「" +
        q.answer +
        "」です";


    }



    document.getElementById("result").innerHTML =

    "<h3>" +
    resultText +
    "</h3>" +


    "<p><b>読み方：</b>" +
    q.pronunciation +
    "</p>" +


    "<p><b>意味：</b>" +
    q.meaning +
    "</p>" +


    "<p><b>例文：</b><br>" +
    q.example +
    "</p>" +


    "<p><b>日本語：</b><br>" +
    q.translation +
    "</p>";



    document.getElementById("score").innerHTML =

    "現在の得点：" +
    score +
    " / 10";



    document.getElementById("nextArea").innerHTML =

    '<button onclick="nextQuestion()">次の問題</button>';

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

    "🎉 10問チャレンジ終了！";


    document.getElementById("choices").innerHTML = "";


    document.getElementById("result").innerHTML =

    "<h3>結果</h3>" +

    "<p>10問中 " +

    score +

    "問正解でした！</p>";



   document.getElementById("nextArea").innerHTML =

'<button id="nextButton">次の問題</button>';


document.getElementById("nextButton").onclick = function(){

    nextQuestion();

};
