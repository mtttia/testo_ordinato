$(document).ready(function(){
    

    $("#text").keypress(function(){
        change(window.event.keyCode);
    });

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
        }
        else{
            elenco = true;
        }
    });

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

    

});
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
var cancellaDoppioSpazio = true;
var caps = false;

//utilities
var elenco = false;
var possibileElenco = false;
var proxTrattino = false; //indica che al prossimo carattere premuto dovrà essere inserito un trattino


function change(keyPressed){    
    //console.log(keyPressed);
    var t = $("#text").val();
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
                if(possibileElenco && t[t.length-2] == '-'){
                    possibileElenco = false;
                    elenco = true;      
                    $("#elenco").attr("checked", "true");
                    text(GetSubstring(t, 2) + "   -  ");
                }
                if(cancellaDoppioSpazio)
                {
                    if(t[t.length-2] == " ")
                    {
                        text(GetSubstring(t));
                    }
                }
                break;
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
        var SecondaParte = stringa.substring(indice+1, stringa.length);      
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

