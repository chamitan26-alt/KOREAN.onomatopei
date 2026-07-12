const question = {
    word:"두근두근",
    answer:1,
    meaning:"ドキドキ",
    example:"시험이라 두근두근해요.",
    japanese:"試験なのでドキドキします。"
};

function check(choice){

    const result=document.getElementById("result");

    if(choice===question.answer){

        result.innerHTML=
        "🎉 正解！<br><br>"
        +question.meaning+
        "<br><br>"
        +question.example+
        "<br>"
        +question.japanese;

    }else{

        result.innerHTML="❌ もう一度挑戦！";

    }

}
