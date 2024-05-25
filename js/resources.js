class Resource {
    constructor(singular_name, plural_name) {
        this.singular_name = singular_name;
        this.plural_name = plural_name;
        this.name = plural_name;

        this.amount = new Decimal(0);

        this.value_string = "UNSETVALUE " + this.name;
        this.update_value_string();

        this.production_rate = new Decimal(0); // per second

        game.resources[this.name] = this;
    }

    update_value_string() {
        if (this.amount.floor().eq(1)) {
            this.value_string = format_value(this.amount) + " " + this.singular_name;
        }
        else {
            this.value_string = format_value(this.amount) + " " + this.plural_name;
        }
    }

    update_displays() {
        this.update_value_string();
        $(".display-" + this.name + "-value_string").html(this.value_string);
        $(".display-" + this.name + "-production_rate").html(format_value(this.production_rate) + " " + this.name + "/s");
    }

    apply_production() {
        this.amount = this.amount.add(this.production_rate.div(game.tickrate));
    }
}



// resource declarations
ants = new Resource("ant", "ants");
ants.amount = new Decimal(2);