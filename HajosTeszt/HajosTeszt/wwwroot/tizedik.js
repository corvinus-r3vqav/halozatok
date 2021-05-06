//var kérdések;
//var jelenlegiKérdés = 1;

//TIZEDIK ÉS TIZENEGYEDIK GYAK
//Az alkalmazás működéséhez szükséges változók

//Array az éppen gyakoroltatott kérdések tárolására
var hotList = [];
var questionsInHotList = 3; 

//Hol is tartunk a kérdésekben?
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;      //A következő kérdés száma a teljes listában

var timeoutHandler;

window.onload = init()




function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    console.log(kérdés.image)
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").classList.remove("rejtett")
    }
    else {

        document.getElementById("kép1").classList.add("rejtett")
    }


    jóVálasz = kérdés.correctAnswer;

    válasz1.classList.remove("jo", "rossz");
    válasz2.classList.remove("jo", "rossz");
    válasz3.classList.remove("jo", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
                    return null;
                }
                else {
                    return result.json()
                }
            })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );


}



function init() {
    console.log("init..." + questionsInHotList)
    for (let i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        } 



    //Kérdések száma
    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Mentett állapot olvasása
    //if (localStorage.getItem("hotList")) {
    //    hotList = JSON.parse(localStorage.getItem("hotList"));
    //}


    //if (localStorage.getItem("displayedQuestion")) {
    //    displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    //}

    //if (localStorage.getItem("nextQuestion")) {
    //    nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    //}

    //Első kérdések letöltése
    //if (hotList.length === 0) {
    //    for (let i = 0; i < questionsInHotList; i++) {
    //        kérdésBetöltés(nextQuestion, i);
    //        nextQuestion++;
    //    } 
    //} else {
    //    console.log("localStorage-ból olvasott kérdésekkel dolgozunk.");
    //    kérdésMegjelenítés();
    //}
    

}





function kattElore() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function kattVissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList-1;
    kérdésMegjelenítés()
}

function választás(n) {
    let kerdes = hotList[displayedQuestion].question;
    if (n === kerdes.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }

    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kerdes.correctAnswer).classList.add("jo");
        hotList[displayedQuestion].goodAnswers=0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timeoutHandler = setTimeout(kattElore, 3000);

    //localStorage.setItem("hotList", JSON.stringify(hotList));
    //localStorage.setItem("displayedQuestion", displayedQuestion);
    //localStorage.setItem("nextQuestion", nextQuestion);
}



