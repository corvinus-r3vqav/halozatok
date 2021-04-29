//var kérdések;
//var jelenlegiKérdés = 1;

//TIZEDIK GYAK
//Az alkalmazás mûködéséhez szükséges változók

//Array az éppen gyakoroltatott kérdések tárolására
var hotList = [];
var questionsInHotList2 = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 

//Hol is tartunk a kérdésekben?
var displayedQuestion;      //A hotList-bõl éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;      //A következõ kérdés száma a teljes listában

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
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
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
                if (displayedQuestion == undefined && destination == 0) { 
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
    );
    

}



function init() {
    for (var i = 0; i < questionsInHotList2; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Elsõ kérdések letöltése
    for (var i = 0; i < questionsInHotList2; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}



function elõre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function kattElore() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function kattVissza() {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function megjelöltVálasz1() {
    let megjelöltválasz1 = document.getElementById("válasz1");
    if (jóVálasz == 1) {
        megjelöltválasz1.classList.add("jo");
    }
    else {
        megjelöltválasz1.classList.add("rossz");
    }
    document.getElementById("válasz1").style.pointerEvents = "none"
    timeoutHandler = setTimeout(elõre, 3000);
}

function megjelöltVálasz2() {
    let megjelöltválasz2 = document.getElementById("válasz2");
    if (jóVálasz == 2) {
        megjelöltválasz2.classList.add("jo");
    }
    else {
        megjelöltválasz2.classList.add("rossz");
    }
    document.getElementById("válasz2").style.pointerEvents = "none"
    timeoutHandler = setTimeout(elõre, 3000);
}

function megjelöltVálasz3() {
    let megjelöltválasz3 = document.getElementById("válasz3");
    if (jóVálasz == 3) {
        megjelöltválasz3.classList.add("jo");
    }
    else {
        megjelöltválasz3.classList.add("rossz");
    }
    document.getElementById("válasz3").style.pointerEvents = "none"
    timeoutHandler = setTimeout(elõre, 3000);
}
