class Testi
{
    private testi;
    private nomeTesti; //i nomi dei testi
    private testoCorrente : number; //l'indice del testo corrente
    private numeriNonUsati;

    constructor(testi, nomi)
    {
        this.testi = testi;
        this.nomeTesti = nomi;
        this.testoCorrente = 0;
        this.numeriNonUsati = new Array();
    }

    getTesto()
    {
        try
        {
            return this.testi[this.testoCorrente];
        }catch(ex)
        {
            console.error(ex);
        }
    }

    setTestoCorrente(i) : void
    {
        if(i < 0 || i >= this.testi.length)
        {
            console.error("index non esistente");
        }
        this.testoCorrente = i;
    }

    getTestoCorrente()
    {
        return this.testoCorrente;
    }

    aggiornaTesto(t) : void
    {
        this.testi[this.testoCorrente] = t;
    }

    indexOf(testo) : any
    {
        for(var i = 0; i < this.testi.length; i++)
        {
            if(this.testi[i] == testo)
            {
                return i;
            }
        }
        return -1;
    }

    getTestoAt(index) : any
    {
        try
        {
            return this.testi[index];
        }catch(ex)
        {
            console.error(ex);
        }
    }

    addTesto(testi, nome) : any
    {
        if(this.numeriNonUsati.length > 0)
        {
            let id = this.numeriNonUsati[0]
            this.nomeTesti[id] = nome;
            this.testi[id] = testi;
            this.numeriNonUsati.shift()
            return id;
        }
        else
        {
            this.nomeTesti.push(nome);
            this.testi.push(testi);
            return this.testi.length - 1;
        }
    }

    status() : any
    {
        return "n text : " + this.testi.length + "\ntesto numero : " + this.testoCorrente;

    }

    rinominaTestoAt(i:number, nome : string) : void
    {
        try
        {
            this.nomeTesti[i] = nome;
        }catch(ex)
        {
            console.error(ex);
        }
    }

    numeroTesti() : any
    {
        return this.testi.length;
    }

    rimuoviTesto(id) : void
    {
        this.numeriNonUsati.push(id);
        //scelgo il nuovo testo corrente : il primo libero
        for(var i = 0; i < this.testi.length; i++)
        {
            let presente = false;
            for(var j = 0; j < this.numeriNonUsati.length && !presente; j++)
            {
                if(this.numeriNonUsati[j] == i)
                {
                    presente = true;
                }
            }
            if(!presente)
            {
                this.testoCorrente = i;
            }
        }
    }
}