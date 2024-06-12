class Resource {
    constructor(name, initial_value) {
        this.name = name;

        //this.amount = new Decimal(0);
        this.amount = new Value(this.name + "_amount", new Decimal(initial_value));

        //this.production_rate = new Decimal(0); // per second
        this.production_rate = new Value(this.name + "_production_rate", new Decimal(0));

        game.resources[this.name] = this;
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