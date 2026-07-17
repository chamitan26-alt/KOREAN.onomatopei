let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// 問題読み込み
fetch("questions.json")
.then(response => response.json())
.then(data => {

    questions = data;

})
.catch(error => {

    console.log(error);

});



// 開始ボタン
document.getElementById("startButton").onclick = function(){


    if(questions.length === 0){

        alert("問題データを読み込み中です。少し待ってください");

        return;

    }


    document.getElementById("startArea").style.display = "none";

    document.getElementById("quizArea").style.display = "block";


    score = 0;

    currentQuestion = 0;


    questions.sort(() => Math.random() - 0.5);


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
    q.question;



    let html = "";


    q.choices.forEach(function(choice,index){


        html +=

        '<button class="choiceButton">' +

        choice +

        '</button>';


    });



    document.getElementById("choices").innerHTML = html;



    document.querySelectorAll(".choiceButton")
    .forEach(function(button,index){


        button.onclick = function(){

            checkAnswer(q.choices[index]);

        };


    });



    document.getElementById("nextArea").innerHTML = "";

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

        alert("正解は「" + q.answer + "」です");

    }



    document.getElementById("score").innerHTML =

    "現在の得点：" + score + " / 10";



    document.getElementById("nextArea").innerHTML =

    '<button onclick="nextQuestion()">次の問題</button>';

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

    "🎉チャレンジ終了！";


    document.getElementById("choices").innerHTML = "";


    document.getElementById("nextArea").innerHTML = "";


    document.getElementById("result").innerHTML =

    "<h3>結果</h3><p>10問中 " +

    score +

    "問正解でした！</p>";

}
