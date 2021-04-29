//var k�rd�sek;
//var jelenlegiK�rd�s = 1;

//TIZEDIK GYAK
//Az alkalmaz�s m�k�d�s�hez sz�ks�ges v�ltoz�k

//Array az �ppen gyakoroltatott k�rd�sek t�rol�s�ra
var hotList = [];
var questionsInHotList2 = 3; //Ez majd 7 lesz, tesztel�shez jobb a 3. 

//Hol is tartunk a k�rd�sekben?
var displayedQuestion;      //A hotList-b�l �ppen ez a k�rd�s van kint
var numberOfQuestions;      //K�rd�sek sz�ma a teljes adatb�zisban
var nextQuestion = 1;      //A k�vetkez� k�rd�s sz�ma a teljes list�ban

var timeoutHandler;

window.onload = init()


 

function k�rd�sMegjelen�t�s() {
    let k�rd�s = hotList[displayedQuestion].question;
    console.log(k�rd�s);
    document.getElementById("k�rd�s_sz�veg").innerText = k�rd�s.questionText
    document.getElementById("v�lasz1").innerText = k�rd�s.answer1
    document.getElementById("v�lasz2").innerText = k�rd�s.answer2
    document.getElementById("v�lasz3").innerText = k�rd�s.answer3

    console.log(k�rd�s.image)
    if (k�rd�s.image) {
        document.getElementById("k�p1").src = "https://szoft1.comeback.hu/hajo/" + k�rd�s.image;
        document.getElementById("k�p1").classList.remove("rejtett")
    }
    else {

        document.getElementById("k�p1").classList.add("rejtett")
    }


    j�V�lasz = k�rd�s.correctAnswer;

    v�lasz1.classList.remove("jo", "rossz");
    v�lasz2.classList.remove("jo", "rossz");
    v�lasz3.classList.remove("jo", "rossz");
}

function k�rd�sBet�lt�s(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hib�s let�lt�s: ${result.status}`)
                }
                else {
                    return result.json()
                }
            })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. k�rd�s let�ltve a hot list ${destination}. hely�re`)
                if (displayedQuestion == undefined && destination == 0) { 
                    displayedQuestion = 0;
                    k�rd�sMegjelen�t�s();
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

    //Els� k�rd�sek let�lt�se
    for (var i = 0; i < questionsInHotList2; i++) {
        k�rd�sBet�lt�s(nextQuestion, i);
        nextQuestion++;
    }
}



function el�re() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    k�rd�sMegjelen�t�s()
}

function kattElore() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    k�rd�sMegjelen�t�s()
}

function kattVissza() {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    k�rd�sMegjelen�t�s()
}

function megjel�ltV�lasz1() {
    let megjel�ltv�lasz1 = document.getElementById("v�lasz1");
    if (j�V�lasz == 1) {
        megjel�ltv�lasz1.classList.add("jo");
    }
    else {
        megjel�ltv�lasz1.classList.add("rossz");
    }
    document.getElementById("v�lasz1").style.pointerEvents = "none"
    timeoutHandler = setTimeout(el�re, 3000);
}

function megjel�ltV�lasz2() {
    let megjel�ltv�lasz2 = document.getElementById("v�lasz2");
    if (j�V�lasz == 2) {
        megjel�ltv�lasz2.classList.add("jo");
    }
    else {
        megjel�ltv�lasz2.classList.add("rossz");
    }
    document.getElementById("v�lasz2").style.pointerEvents = "none"
    timeoutHandler = setTimeout(el�re, 3000);
}

function megjel�ltV�lasz3() {
    let megjel�ltv�lasz3 = document.getElementById("v�lasz3");
    if (j�V�lasz == 3) {
        megjel�ltv�lasz3.classList.add("jo");
    }
    else {
        megjel�ltv�lasz3.classList.add("rossz");
    }
    document.getElementById("v�lasz3").style.pointerEvents = "none"
    timeoutHandler = setTimeout(el�re, 3000);
}
