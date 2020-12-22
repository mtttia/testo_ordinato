var TextSostitute = /** @class */ (function () {
    function TextSostitute(sub, sos) {
        this.substring = sub;
        this.sostitute = sos;
    }

    TextSostitute.prototype.sostituisci = function (testo)
    {
        let arr = testo.split(this.substring);
        let t = "";
        for(var i = 0; i < arr.length; i++)
        {
            if(i == arr.length-1)
            {
                t += arr[i];
            }
            else
            {
                t += arr[i] + " " + this.sostitute;
            }
        }

        return t;
    }

    TextSostitute.prototype.presente = function (testo)
    {
        if(testo.split(this.substring).length >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    /*
    TextSostitute.prototype.sostituisci = function (testo) {
        //let a : number = 0; //indice della substring
        var posDaSostituire = new Array();
        posDaSostituire.push(0);
        for (var i = 0; i <= testo.length - this.lunghezzaSubstring(); i++) {
            var corrisponde = true;
            console.log(this.lunghezzaSubstring());
            for (var j = 0; j < this.lunghezzaSubstring() && corrisponde; j++) {
                console.log(testo[i] + " != " + this.substring[j]);
                if (testo[i + j] != this.substring[j]) {
                    corrisponde = false;
                }
            }
            if (corrisponde) {
                console.log("corrispondere");
                //abbiamo trovato una substring corrispondente, ora bisogna cancellarla
                //mi segno l'indice dove andrò ad aggiungere la stringa sostituita
                posDaSostituire.push(i);
                //elimino la parte che va sostituita dopo esseri segnato l'indice
                testo = testo.substring(0, i) + testo.substring(i + this.lunghezzaSubstring() + 1, testo.length);
            }
        }
        posDaSostituire.push(testo.length);
        var dividiTesto = new Array();
        for (var i = 0; i < posDaSostituire.length - 1; i++) {
            dividiTesto.push(testo.substring(posDaSostituire[i], posDaSostituire[i + 1] + 1));
            
        }
        var t = "";
        for (var i = 0; i < dividiTesto.length; i++) 
        {
            if(i == dividiTesto.length - 1)
            {
                t += dividiTesto[i];
            }
            else
            {
                t += dividiTesto[i] + this.sostitute;
            }
        }
        
        return t;
    };*/
    TextSostitute.prototype.lunghezzaSubstring = function () {
        return this.substring.length;
    };
    return TextSostitute;
}());
