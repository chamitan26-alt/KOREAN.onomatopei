let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question");
const choicesArea = document.getElementById("choices");
const resultText = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("score");


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



function showQuestion() {

    answered = false;

    resultText.textContent = "";
    resultText.className = "";

    nextButton.style.display = "none";


    let q = questions[currentQuestion];


    questionText.textContent =
        `${currentQuestion + 1}問目：${q.question}`;


    choicesArea.innerHTML = "";


    // ★選択肢を毎回シャッフル
    let shuffledChoices = shuffle([...q.choices]);


    shuffledChoices.forEach(choice => {


        const button = document.createElement("button");

        button.textContent = choice;
        button.className = "choice";


        button.onclick = () => {

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


            scoreText.textContent =
                `現在の得点：${score} / ${questions.length}`;


            nextButton.style.display = "inline-block";

        };


        choicesArea.appendChild(button);

    });

}



nextButton.onclick = () => {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();


    } else {

        questionText.textContent =
            "🎉 終了しました！";


        choicesArea.innerHTML = "";


        resultText.textContent =
            `あなたの得点は ${score} / ${questions.length} 点です！`;


        nextButton.style.display = "none";

    }

};



function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}
