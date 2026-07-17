let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question");
const choicesArea = document.getElementById("choices");
const resultText = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("score");


// questions.jsonを読み込む
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = shuffle(data).slice(0, 10);
        showQuestion();
    })
    .catch(error => {
        questionText.textContent = "問題データを読み込めませんでした";
        console.log(error);
    });


// 問題表示
function showQuestion() {

    answered = false;
    resultText.textContent = "";
    nextButton.style.display = "none";

    let q = questions[currentQuestion];

    questionText.textContent =
        `${currentQuestion + 1}問目：${q.question}`;

    choicesArea.innerHTML = "";

    q.choices.forEach(choice => {

        let button = document.createElement("button");
        button.textContent = choice;
        button.className = "choice";

        button.onclick = function () {

            if (answered) return;

            answered = true;

            if (choice === q.answer) {

                score++;
                resultText.textContent = "⭕ 正解！";
                resultText.className = "correct";

            } else {

                resultText.textContent =
                    `❌ 正解は「${q.answer}」`;
                resultText.className = "incorrect";

            }

            nextButton.style.display = "inline-block";
            scoreText.textContent =
                `現在の得点：${score} / ${questions.length}`;
        };

        choicesArea.appendChild(button);

    });
}


// 次の問題
nextButton.onclick = function(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        questionText.textContent =
            "🎉 終了しました！";

        choicesArea.innerHTML = "";

        resultText.textContent =
            `あなたの得点は ${score} / ${questions.length} 点です！`;

        nextButton.style.display = "none";
    }

};


// 配列をランダム化
function shuffle(array){

    return array.sort(
        () => Math.random() - 0.5
    );

}
