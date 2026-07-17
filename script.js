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



// スタートボタン
document.getElementById("startButton").onclick = function(){


    if(questions.length === 0){

        alert("問題データを読み込み中です");

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


    q.choices.forEach(function(choice){


        html +=

        '<button class="choiceButton">' +
        choice +
        '</button>';


    });



    document.getElementById("choices").innerHTML = html;


    document.getElementById("result").innerHTML = "";


    document.querySelectorAll(".choiceButton")
    .forEach(function(button){


        button.onclick = function(){


            checkAnswer(button.innerHTML);


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


    let resultHTML = "";



    if(choice === q.answer){


        score++;


        resultHTML +=

        "<h3>✨ 正解！</h3>";


    }else{


        resultHTML +=

        "<h3>💡 正解は「" +
        q.answer +
        "」です</h3>";


    }



    resultHTML +=

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



    document.getElementById("result").innerHTML =
    resultHTML;



    document.getElementById("score").innerHTML =
    "現在の得点：" + score + " / 10";



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



    document.getElementById("nextArea").innerHTML = "";

}
