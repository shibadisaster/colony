class Resource {
    constructor(name) {
        this.name = name;
        this.plural_name = name + "s";
        this.amount = 0;

        this.value_string = this.amount + " " + this.plural_name

        game.resources[this.name] = this;
    }

    get_value_string() {

    }
}



// resource declarations
ant = new Resource("ant")