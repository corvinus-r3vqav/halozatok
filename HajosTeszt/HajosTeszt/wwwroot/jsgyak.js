/*window.onload =*/ /*function elsoFeladat()
{
    for (i=1; i<=10; i++)
    {
        document.write("<div class='feladat1'>" + i);
        document.write("</div>");
        document.write("<style> .feladat1 { background-color: rgb(100, 100, 255); }");
        document.write("</style>")
           
    }
}*/

window.onload = function () {
    console.log("start");
    let hova = document.getElementById("eredeti");
    for (var s=0; s<10; s++)
    {
        let sor = document.createElement("div");
        sor.classList.add("sor");//sor nevű osztályba tesszük
        hova.appendChild(sor);//a hova gyermekei közé teszi be
    
        for (var o=0; o<10; o++)
        {
            let szam=document.createElement("div");
            sor.appendChild(szam);
            szam.classList.add("elem");
            szam.innerText=(s+1)*(o+1);
            szam.style.background = `rgb(${255-255/10*o},0,${255-255/10*s})`
            
            
        }

        
    }

}

var faktorialis = function (n) {
    let eredmeny=1;
    for (let i=2; i<=n; i++)
    {
        eredmeny=eredmeny*i;
    }

    return eredmeny;
}

function feladat2 () {
    console.log("betöltődött");
    let hova2 = document.getElementById("pascal");
    for (var s=0; s<10; s++)
    {
        let sor2 = document.createElement("div");
        sor2.classList.add("sor2");//sor2 nevű osztályba tesszük
        hova2.appendChild(sor2);//a hova2 gyermekei közé teszi be
    
        for (var o=0; o<=s; o++)
        {
            let szam2=document.createElement("div");
            sor2.appendChild(szam2);
            szam2.classList.add("elem2");
            szam2.style.top=s*30;
            szam2.style.left=o*30;            
            szam2.innerText=faktorialis(s)/(faktorialis(o)*faktorialis(s-o));                              
        }

        
    }

}
