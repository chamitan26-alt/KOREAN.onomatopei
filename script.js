let questions = [];
let quizQuestions = [];
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
const scoreText = document.getElementById("score");
const homeButton = document.getElementById("homeButton");

// ======================
// データ読み込み
// ======================
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => {
        console.error("読み込みエラー", error);
    });

// ======================
// スタート
// ======================
startButton.onclick = function() {
    startArea.style.display = "none";
    quizArea.style.display = "block";
    startQuiz();
};

// ======================
// クイズ開始
// ======================
function startQuiz() {
    // 全問題からランダムに10問ピックアップ
    quizQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    currentQuestion = 0;
    score = 0;
    scoreText.innerHTML = "現在の得点：0 / 10";
    showQuestion();
}

// ======================
// 問題表示
// ======================
function showQuestion() {
    answered = false;

    // 中身を空にするのと同時に、要素自体を非表示（display="none"）にする
    resultText.innerHTML = "";
    resultText.style.display = "none";

    explanationText.innerHTML = "";
    explanationText.style.display = "none";

    nextButton.style.display = "none";
    choicesArea.innerHTML = "";

    let q = quizQuestions[currentQuestion];

    questionText.innerHTML = `${currentQuestion + 1}問目 / 10問<br><br>${q.question}`;

    // 「 の意味」の手前を韓国語単語として抽出
    currentKoreanWord = q.question.split(" の意味")[0];

    // 空白を除去
    let validChoices = q.choices.filter(choice => choice && choice.trim() !== "");

    // 選択肢の中に正解がなければ強制的に追加（バグ対策）
    if (!validChoices.includes(q.answer)) {
        validChoices.push(q.answer);
    }

    // 正解を含めた上でランダムに4つ抽出し、さらにシャッフル
    let finalChoices = validChoices.slice(0, 4);
    finalChoices.sort(() => Math.random() - 0.5);

    finalChoices.forEach(choice => {
        let button = document.createElement("button");
        button.textContent = choice;
        button.onclick = function() {
            checkAnswer(choice, q);
        };
        choicesArea.appendChild(button);
    });
}

// ======================
// 発音
// ======================
speakButton.onclick = function() {
    if (!currentKoreanWord) return;
    
    // 読み上げ中の音声を一度停止（連打対策）
    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = currentKoreanWord;
    speech.lang = "ko-KR";
    speech.rate = 0.8;
    speechSynthesis.speak(speech);
};

// ======================
// 答え確認
// ======================
function checkAnswer(choice, q) {
    if (answered) return;
    answered = true;

    const buttons = document.querySelectorAll("#choices button");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === q.answer) {
            button.classList.add("correct");
        }
        if (button.textContent === choice && choice !== q.answer) {
            button.classList.add("wrong");
        }
    });

    if (choice === q.answer) {
        score++;
        scoreText.innerHTML = `現在の得点：${score} / 10`;
        resultText.innerHTML = "⭕ 正解！";
    } else {
        resultText.innerHTML = `❌ 不正解<br>正解：${q.answer}`;
    }

    explanationText.innerHTML = `📖 解説<br>${q.explanation || "解説なし"}`;

    // 答え合わせが終わったタイミングで枠（シェイプ）を表示させる
    resultText.style.display = "block";
    explanationText.style.display = "block";
    nextButton.style.display = "block";
}

// ======================
// 次の問題、または終了画面
// ======================
nextButton.onclick = function() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        // クイズエリアをリライト
        quizArea.innerHTML = `
            <h2>🎉終了！</h2>
            <p>得点：${score} / 10</p>
            <button id="retryButton">もう一度挑戦する</button>
            <br><br>
            <button id="resultHomeButton">トップへ戻る</button>
        `;

        document.getElementById("retryButton").onclick = () => location.reload();
        document.getElementById("resultHomeButton").onclick = () => location.reload();
    }
};

// ======================
// 途中で戻る
// ======================
homeButton.onclick = function() {
    const result = confirm("クイズを終了してトップ画面に戻りますか？");

    if (result) {
        quizArea.style.display = "none";
        startArea.style.display = "block";
        
        // 初期化
        currentQuestion = 0;
        score = 0;
        answered = false;
        currentKoreanWord = "";

        questionText.innerHTML = "";
        choicesArea.innerHTML = "";
        
        resultText.innerHTML = "";
        resultText.style.display = "none";

        explanationText.innerHTML = "";
        explanationText.style.display = "none";

        nextButton.style.display = "none";
    }
};
