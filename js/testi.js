var Testi = /** @class */ (function () {
    function Testi(testi, nomi) {
        this.testi = testi;
        this.nomeTesti = nomi;
        this.testoCorrente = 0;
        this.numeriNonUsati = new Array();
    }
    Testi.prototype.getTesto = function () {
        try {
            return this.testi[this.testoCorrente];
        }
        catch (ex) {
            console.error(ex);
        }
    };
    Testi.prototype.setTestoCorrente = function (i) {
        if (i < 0 || i >= this.testi.length) {
            console.error("index non esistente");
        }
        this.testoCorrente = i;
    };
    Testi.prototype.getTestoCorrente = function () {
        return this.testoCorrente;
    };
    Testi.prototype.aggiornaTesto = function (t) {
        this.testi[this.testoCorrente] = t;
    };
    Testi.prototype.indexOf = function (testo) {
        for (var i = 0; i < this.testi.length; i++) {
            if (this.testi[i] == testo) {
                return i;
            }
        }
        return -1;
    };
    Testi.prototype.getTestoAt = function (index) {
        try {
            return this.testi[index];
        }
        catch (ex) {
            console.error(ex);
        }
    };
    Testi.prototype.addTesto = function (testi, nome) {
        if (this.numeriNonUsati.length > 0) {
            var id = this.numeriNonUsati[0];
            this.nomeTesti[id] = nome;
            this.testi[id] = testi;
            this.numeriNonUsati.shift();
            return id;
        }
        else {
            this.nomeTesti.push(nome);
            this.testi.push(testi);
            return this.testi.length - 1;
        }
    };
    Testi.prototype.status = function () {
        return "n text : " + this.testi.length + "\ntesto numero : " + this.testoCorrente;
    };
    Testi.prototype.rinominaTestoAt = function (i, nome) {
        try {
            this.nomeTesti[i] = nome;
        }
        catch (ex) {
            console.error(ex);
        }
    };
    Testi.prototype.numeroTesti = function () {
        return this.testi.length;
    };
    Testi.prototype.rimuoviTesto = function (id) {
        this.numeriNonUsati.push(id);
        //scelgo il nuovo testo corrente : il primo libero
        for (var i = 0; i < this.testi.length; i++) {
            var presente = false;
            for (var j = 0; j < this.numeriNonUsati.length && !presente; j++) {
                if (this.numeriNonUsati[j] == i) {
                    presente = true;
                }
            }
            if (!presente) {
                this.testoCorrente = i;
            }
        }
    };
    return Testi;
}());
