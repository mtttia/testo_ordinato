class Tendina
{
    private items; //array di bottoni
    private ListClass : string;
    public ItemClass : string;

    constructor(itemClass : string, listClass : string){
        this.items = new Array();
        this.ItemClass = itemClass;
        this.ListClass = listClass;
    }

    public addButton(nome : string, event : string) : void
    {
        let button = document.createElement("button");
        button.innerHTML = nome;
        button.setAttribute("onclick", event);
        button.setAttribute("class", this.ItemClass);
        this.items.push(button);
    }

    public getElement() : any
    {
        //usa il dropdown di bootstrap
        var ul = document.createElement("ul");
        ul.setAttribute("class", this.ListClass);
        for(var i = 0; i < this.items.length; i++)
        {
            var li = document.createElement("li");
            li.appendChild(this.items[i]);
            ul.appendChild(li);
        }
        return ul;
    }

}