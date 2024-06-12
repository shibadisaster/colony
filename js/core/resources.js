class Resource {
    constructor(singular_name, plural_name, initial_value) {
        this.singular_name = singular_name;
        this.plural_name = plural_name;
        this.name = plural_name;

        //this.amount = new Decimal(0);
        this.amount = new Value(this.name + "_amount", new Decimal(initial_value));

        this.value_string = "UNSETVALUE " + this.name;
        this.update_value_string();

        //this.production_rate = new Decimal(0); // per second
        this.production_rate = new Value(this.name + "_production_rate", new Decimal(0));

        game.resources[this.name] = this;
    }

    update_value_string() {
        if (this.amount.value.floor().eq(1)) {
            this.value_string = format_value(this.amount.value) + " " + this.singular_name;
        }
        else {
            this.value_string = format_value(this.amount.value) + " " + this.plural_name;
        }
    }

    update_displays() {
        this.update_value_string();
        $(".display-" + this.name + "-value_string").html(this.value_string);
        $(".display-" + this.name + "-production_rate").html(format_value_with_decimal(this.production_rate.value) + " " + this.name + "/s");
    }

    apply_production() {
        //this.apply_value_modifiers();
        this.amount.get_base_modifier().value = 
            this.amount.get_base_modifier().value.add(this.production_rate.value.div(game.tickrate));
    }

    // apply_value_modifiers() {
    //     this.production_rate = new Decimal(0);
    //     for (var mod in this.production_modifiers) {
    //         this.production_rate = this.production_modifiers[mod].apply_modifier(this.production_rate);
    //     }
    // }

    add_value_modifier(modifier) {
        this.production_rate.value_modifiers.push(modifier);
    }
}