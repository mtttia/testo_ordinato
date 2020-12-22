class TextSostitute
{
    substring : string;
    sostitute : string;

    constructor(sub : string, sos : string)
    {
        this.substring = sub;
        this.sostitute = sos;   
    }

    sostituisci(testo : string)
    {
        //let a : number = 0; //indice della substring
        var posDaSostituire = new Array();
        posDaSostituire.push(0);
        for(var i : number = 0; i < testo.length - this.lunghezzaSubstring(); i++)
        {

            var corrisponde : boolean = true;
            for(var j : number = 0; j < this.lunghezzaSubstring() && corrisponde; i++)
            {
                if(testo[i] != this.substring[j])
                {
                    corrisponde = false;
                }
            }

            if(corrisponde)
            {
                //abbiamo trovato una substring corrispondente, ora bisogna cancellarla
                //mi segno l'indice dove andrò ad aggiungere la stringa sostituita
                posDaSostituire.push(i);
                //elimino la parte che va sostituita dopo esseri segnato l'indice
                testo = testo.substring(0, i+1) + testo.substring(i + this.lunghezzaSubstring(), testo.length);
            }

        }

        posDaSostituire.push(testo.length-1);
        let dividiTesto = new Array();
        for(var i = 0; i < posDaSostituire.length - 1; i++)
        {
            dividiTesto.push(testo.substring(posDaSostituire[i], posDaSostituire[i+1] + 1));
        }
        let t = "";
        for(var i = 0; i < dividiTesto.length; i++)
        {
            t += dividiTesto[i] + this.sostitute;
        }

        return t;
    }

    lunghezzaSubstring()
    {
        return this.sostitute.length;
    }
}