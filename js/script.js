
$(document).ready(function(){
    //creo un nuovo testo vuoto
    addText("", "index");
    cambiaTesto();
    file_click(testi.getTestoCorrente());

    $("#text").keypress(function(){
        change(window.event.keyCode);
    });

    $("#text").change(function (){
        testi.aggiornaTesto($("#text").val());
    })

    $("#switchDarkMode").change(function ()
    {
        toggleMode();
    });

    $("#elenco").change(function () {
        if(document.getElementById("elenco").checked == false)
        {
            elenco = false;
            possibileElenco = false;
            proxTrattino = false;
            $("#chiudiElenco").removeClass("visible");
            $("#chiudiElenco").addClass("invisible");
        }
        else{
            elenco = true;
            $("#chiudiElenco").addClass("visible");
            $("#chiudiElenco").removeClass("invisible");
        }
    });

    $("#chiudiElenco").click(function(){
        document.getElementById("elenco").checked = false
        elenco = false;
        possibileElenco = false;
        proxTrattino = false;
        $("#chiudiElenco").removeClass("visible");
        $("#chiudiElenco").addClass("invisible");
    })

    $("#formattaTesto").click(function (){
        formattaTesto($("#text").val());
    });

    

    $("#cancellaDoppie").change(function () {   
        cancellaDoppie = document.getElementById("cancellaDoppie").checked;
    });

    $("#capsDopoPunto").change(function () {
        capsDopoPunto = document.getElementById("capsDopoPunto").checked;
    })

    $("#cancellaDoppiSpazi").change(function () {
        cancellaDoppioSpazio = document.getElementById("cancellaDoppiSpazi").checked;
    })

    //menu
    $("#txtGrandezzaTesto").change(function (){
        //modifca la grandezza del testo della tex area
        $("#text").css("font-size", $("#txtGrandezzaTesto").val() + "px");
    })

    $("#aggiungi_testo").click(function(){
        addText();
    })

    $("#chiudiParentesiConDoppioSpazio").change(function(){
        chiudiParentesiConDoppioSpazio = document.getElementById("chiudiParentesiConDoppioSpazio").checked;
    })

    
    tutorial.show();

    GestioneFileAperti();

});

$(window).resize(GestioneFileAperti);
function ChangeFont(value){        
    $("#text").css("font-family", value);
}
 //potranno essere modificati
var virgola = ", ";
var duePunti = " : ";
var elencoChar = "-";
var cancellaDoppie = true;
var capsDopoPunto = true;
var chiusuraElementiAutomatica = true;
var chiudiParentesiConDoppioSpazio = true;
var numeroParentesiAperte = 0;
var cancellaDoppioSpazio = true;
var caps = false;
var tutorial = new bootstrap.Modal(document.getElementById('modalItrodution'), {
    keyboard: false
  })
var testi = new Testi(new Array(), new Array());
var sostituto = new Array(); //si attivano quando si scrive la substring e poi si spinge il comandi "spazio"
RiempiSostituti();
//sostituzioni di default
function RiempiSostituti()
{
    //sostituti di default
    /*
    -> = → 8594
    <- = ← 8592
    --> = ⇉ 8649
    <-- = ⇇ 8647
    => = ⇒ 8658
    <= = ⇐ 8656
    */
    sostituto.push(new TextSostitute('->', '→'));
    sostituto.push(new TextSostitute('=>', '⇒'));
    sostituto.push(new TextSostitute('<-', '←'));
    sostituto.push(new TextSostitute('<=', '⇐'));
}

//utilities
var elenco = false;
var possibileElenco = false;
var proxTrattino = false; //indica che al prossimo carattere premuto dovrà essere inserito un trattino



function change(keyPressed){    
    //console.log(keyPressed);    
    var t = $("#text").val();
    testi.aggiornaTesto(t);
    if(proxTrattino)
    {
        text(GetSubstring(t, 0) + "   -  ");
        proxTrattino = false;
    }
    //console.log(t[t.length-1] + ", stringa -> " + t + ", lunghezza -> " + t.length);
    if(t.length > 1)
    {
        switch(t[t.length-1]){
            case ',':
                text(GetSubstring(t)+virgola);
                if(cancellaDoppie)
                {
                    if(t[t.length-3] == ',')
                    {
                        text(GetSubstring(t, 1))
                    }
                }
                break;
            case ':':
                text(GetSubstring(t) + duePunti);            
                if(cancellaDoppie)
                {
                    if(t[t.length-3] == ':')
                    {
                        text(GetSubstring(t, 1))
                    }
                }
                break;
            case '.':
                capsDopoPunto ? caps = true : caps = false;
                text(GetSubstring(t) + ". ");
                //console.log("caps");
                break;
            case '!':
                capsDopoPunto ? caps = true : caps = false;
                text(GetSubstring(t) + "! ");
                //console.log("caps");
                break;
            case '?':
                capsDopoPunto ? caps = true : caps = false;
                text(GetSubstring(t) + "? ");
                //console.log("caps");
                break;
            case ' ':
                //controllo se è una textsostitute
                for(var h = 0; h < sostituto.length; h++)
                {
                    let indiceP = t.length - sostituto[h].lunghezzaSubstring() - 1;
                    if(sostituto[h].presente(t.substring(indiceP, t.length + 1)))
                    {                        
                        let txt = t.substring(indiceP, t.length + 1);
                        text(GetSubstring(t, sostituto[h].lunghezzaSubstring() + 1) + sostituto[h].sostituisci(txt));
                    }
                }
                if(possibileElenco && t[t.length-2] == '-'){
                    possibileElenco = false;
                    elenco = true;      
                    document.getElementById("elenco").checked = true;
                    $("#chiudiElenco").addClass("visible");
                    $("#chiudiElenco").removeClass("invisible");
                    text(GetSubstring(t, 2) + "   -  ");
                }
                if(chiudiParentesiConDoppioSpazio && numeroParentesiAperte >= 1)
                {
                    //c'è una parentesi da chiudere
                    if(t[t.length - 2] == " ")
                    {
                        //chiudo la parentesi
                        text(GetSubstring(t, 2) + ") ");
                        numeroParentesiAperte--;
                    }
                }
                else
                {
                    if(cancellaDoppioSpazio)
                    {
                        if(t[t.length-2] == " ")
                        {
                            text(GetSubstring(t));
                        }
                    }
                }
                
                
                break;
            case '(':
                numeroParentesiAperte++;
                break;
            case ')':
                numeroParentesiAperte--;
        }
    }
    if(t.length == 1)
        caps = true;//la prima lettera va messa maiusola
    if(keyPressed == 13)
    {
        //ha spinto l'invio, potrebbe arrivare un elenco
        if(elenco)
        {
            proxTrattino = true;
        }
        else
        {
            possibileElenco = true;
        }
    }
    if(caps)
    {        
        var codice = lastChar(t).charCodeAt(0);
        //ascii -> a -> 97, z -> 122
        if(codice >= 97 && codice <= 122)
        {
            codice -= 32;
            text(GetSubstring(t) + String.fromCharCode(codice));
            caps = false;
        }
        
    }
}

    


function GetSubstring(t, fine = 1)
{
    return t.substring(0, t.length - fine);
}


function lastChar(t){
    return t[t.length-1];
}

function text(text)
{
    $("#text").val(text);
}



var correggiVirgole = true;
var correggiDuePunti = true;
var correggiPunti = true;
var correggiPuntiEsclamativi = true;
var correggiPuntiInterrogativi = true;
function formattaTesto(t)
{
    //il simbolo a capo viene letto come /n
    var lunghezzaTesto = t.length;
    //var UltimaModifica = 0;
    var toCaps = false;
    var toReturn = "";

    for(var i = 0; i < lunghezzaTesto - 1; i++)
    {
        switch(t[i])
        {
            case ',':
                if(correggiVirgole)
                {
                    if(t[i+1] != " ")
                    {
                        //correggo aggiungendo uno spazio
                        t = AggiungiStringAt(t, " ", i+1)
                        /*UltimaModifica = i;
                        toReturn += */
                    }
                }
                break;
            case ':':
                if(correggiDuePunti)
                {
                    if(i == 0)
                    {
                        if(t[i+1] != " ")
                        {
                            //correggo aggiungendo uno spazio
                            t = AggiungiStringAt(t, " ", i+1)
                        }
                    }
                    else
                    {
                        if(t[i+1] != " ")
                        {
                            //correggo aggiungendo uno spazio
                            t = AggiungiStringAt(t, " ", i+1)
                            if(t[i-1] != " ")
                            {
                                t = AggiungiStringAt(t, " ", i);
                            }
                        }
                        else if(t[i-1] != " ")
                        {
                            t = AggiungiStringAt(t, " ", i);
                        }
                    }
                }
                break;
            case '.':
                if(correggiPunti)
                {
                    if(t[i+1] != " ")
                    {
                        //correggo aggiungendo uno spazio
                        t = AggiungiStringAt(t, " ", i+1)
                    }
                    //dice che la prossima lettera deve essere maiuscola
                    toCaps = true;
                }
                break;
            case '!':
                if(correggiPuntiEsclamativi)
                {
                    if(t[i+1] != " ")
                    {
                        //correggo aggiungendo uno spazio
                        t = AggiungiStringAt(t, " ", i+1)
                    }
                    //dice che la prossima lettera deve essere maiuscola
                    toCaps = true;
                }
                break;
            case '?':
                if(correggiPuntiInterrogativi)
                {
                    if(t[i+1] != " ")
                    {
                        //correggo aggiungendo uno spazio
                        t = AggiungiStringAt(t, " ", i+1)
                    }
                    //dice che la prossima lettera deve essere maiuscola
                    toCaps = true;
                }
                break;
        }

        if(toCaps)
        {
            if(t[i].charCodeAt(0) >= 97 && t[i].charCodeAt(0) <= 122)
            {
                //sostituisco con una lettere maiuscola
                //32 è la differenza tra le codifiche delle lettere maiuscole e di quelle minuscole nel codice ASCII
                t = SostituisciCharAt(t, String.fromCharCode(t[i].charCodeAt(0)-32), i);
                toCaps = false;
            }
            if(t[i].charCodeAt(0) >= 65 && t[i].charCodeAt(0) <= 90)
            {
                //la lettera maiuscola c'è già
                toCaps = false;
            }
        }
    }
    text(t);
}

function AggiungiStringAt(stringa, stringaDaAggiungere, indice)
{
    //il valore viene messo dopo l'indice
    var substr = stringa.split(stringa.substring(0, indice));
    var fineStringa = "";
    for(var i = 1; i < substr.length; i++)
    {
        fineStringa += substr[i];
    }
    return stringa.substring(0, indice) + stringaDaAggiungere + fineStringa;
    
}

function SostituisciCharAt(stringa, sostituta, indice)
{
    //controllo se l'indice è l'ultima posizione
    if(indice+1 == stringa.length)
    {
        return stringa.substring(0, stringa.length-1) + sostituta;
    }
    else
    {
        var SecondaParte = stringa.substring(indice + 1, stringa.length);      
        return stringa.substring(0, indice) + sostituta + SecondaParte;
    }
}

function Menu_Click(menuOpen)
{
    if(!menuOpen)
    {
        
    }
    else
    {
        
    }
}

function aggiungiFile(t, nome)
{
    let i = addText(t, nome);
    cambiaTesto(i);
}

function addText(t, n)
{    
    var id = testi.addTesto(t);
    let nome = "nuovo file " + id;
    if(arguments.length > 1)
    {
        nome = n;
    }
    

    addFile(id, nome);  

    return id;
}

function cambiaTesto(i)
{    
    if(arguments.length >= 1)
    {
        testi.setTestoCorrente(i);
    }
    
    $("#text").val(testi.getTesto());
}

//gestione dei file aperti
/*
larghezza dei button = 250px
per dimensioni schermo : (540px	720px	960px	1140px	1320px)
0 - 540 -> 1
540 - 720 -> 2
720 - 960 -> 3
960 - 1140 -> 4
1140 - 1320 -> 4
1302 - oo -> 6
*/
let col; //è il numero di col di bootstrap (max 12) che un file utilizza
let nFile; //n di file massimo in una riga
let fileInDispaly = 0;
let file = document.getElementById("pagine");

function GestioneFileAperti()
{
    let width = $(window).width();
    if(width < 540)
    {
        col = 12;
    }
    else if(width < 720)
    {
        col = 6;
    }
    else if(width < 960)
    {
        col = 4;
    }
    else if(width < 1320)
    {
        col = 3;
    }
    else
    {
        col = 2;
    }
    nFile = 12 / col;
}

function addFile(id, nome)
{
    var div = document.createElement("div");
    div.style.marginBottom = "15px";
    div.setAttribute("id", id+"div");
    div.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xxl-2 btn-group");
    var span = document.createElement("span");
    span.setAttribute("class", "visually-hidden");
    span.innerHTML = "Toggle Dropdown";
    var button = document.createElement("button");
    button.innerHTML = nome;
    button.setAttribute("id", id + "file");
    button.setAttribute("class",  " btn btn-primary board-menu-button");
    button.setAttribute("onclick", "file_click(" + id + ")");
    var button2  = document.createElement("button");
    button2.setAttribute("class", "btn btn-primary dropdown-toggle dropdown-toggle-split");
    button2.setAttribute("data-bs-toggle", "dropdown");
    button2.setAttribute("aria-expanded", "false");
    ul = getTendina(id);
    div.appendChild(button);
    button2.appendChild(span);
    div.appendChild(button2);        
    div.appendChild(ul);
    file.appendChild(div);
}

function file_click(id)
{
    cambiaTesto(id);
    //seleziono il file
    console.log("id : " + id + ", numeroTesti : " + testi.numeroTesti());
    for(var i = 0; i < testi.numeroTesti(); i++)
    {
        if(i == id)
        {
            $("#" + i +"file").addClass("btn-warning");
            $("#" + i +"file").removeClass("btn-primary");
        }
        else
        {
            $("#" + i +"file").addClass("btn-primary");
            $("#" + i +"file").removeClass("btn-warning");
        }
    }
}

function getTendina(id){
    var t = new Tendina("dropdown-item", "dropdown-menu");
    t.addButton("rinomina", "rinominaFile(" + id + ")");
    t.addButton("cancella", "cancellaFile(" + id + ")");
    return t.getElement();
}

function rinominaFile(id)
{
    ren(id, prompt("inserisci il nome sostituto", ""));
}
function ren(id, nome)
{
    testi.rinominaTestoAt(id, nome);
    document.getElementById(id + "file").innerHTML = nome;
}
function cancellaFile(id)
{
    $("#text").val("");
    //controllo che non sia l'ultimo testo
    if(testi.numeroTesti() == 1)
    {
        testi.rimuoviTesto(id);
        $("#" + id + "div").remove();
        addText()
        
    }
    else
    {
        testi.rimuoviTesto(id);
        $("#" + id + "div").remove();
    }
    file_click(testi.getTestoCorrente());
}

function mostraTutorial()
{
    tutorial.show();
}