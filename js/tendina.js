var Tendina = /** @class */ (function () {
    function Tendina(itemClass, listClass) {
        this.items = new Array();
        this.ItemClass = itemClass;
        this.ListClass = listClass;
    }
    Tendina.prototype.addButton = function (nome, event) {
        var button = document.createElement("button");
        button.innerHTML = nome;
        button.setAttribute("onclick", event);
        button.setAttribute("class", this.ItemClass);
        this.items.push(button);
    };
    Tendina.prototype.getElement = function () {
        //usa il dropdown di bootstrap
        var ul = document.createElement("ul");
        ul.setAttribute("class", this.ListClass);
        for (var i = 0; i < this.items.length; i++) {
            var li = document.createElement("li");
            li.appendChild(this.items[i]);
            ul.appendChild(li);
        }
        return ul;
    };
    return Tendina;
}());
