let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// questions.json読み込み
fetch("questions.json")
.then(function(response){

    return response.json();

})
.then(function(data){

    questions = data;

    console.log("読み込み成功", questions.length + "問");

})
.catch(function(error){

    console.log("読み込み失敗", error);

});



// スタートボタン
document.getElementById("startButton").addEventListener("click", function(){

    if(questions.length === 0){

        alert("問題データを読み込めていません");

        return;

    }


    document.getElementById("startButton").style.display = "none";


    score = 0;
    currentQuestion = 0;


    document.getElementById("score").innerHTML =
    "スコア：0 / 10";


    questions.sort(function(){

        return Math.random() - 0.5;

    });


    showQuestion();


});




// 問題表示
function showQuestion(){

    answered = false;


    let q = questions[currentQuestion];


    document.getElementById("question").innerHTML =

    (currentQuestion + 1) +
    "問目<br><br>" +
    q.question;



    let html = "";


    q.choices.forEach(function(choice,index){


        html +=

        '<button class="choiceButton" id="choice' + index + '">' +

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


        alert("正解✨");


    }else{


        alert(

        "不正解\n正解は「" +

        q.answer +

        "」です"

        );


    }



    document.getElementById("score").innerHTML =

    "スコア：" +

    score +

    " / 10";



    document.getElementById("nextArea").style.display = "block";


}




// 次へボタン
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



    document.getElementById("choices").innerHTML = "";



    document.getElementById("result").innerHTML =

    "<h3>結果</h3>" +

    "<p>10問中 " +

    score +

    "問正解！</p>";



}
