$('document').ready(function() {
    // resource declarations
    ants = new Resource("ants", new Decimal(2));





    // value declarations
    carrying_capacity = new Value("ant_carrying_capacity", new Decimal(50));





    // value modifier declarations
    ants_breeding_production = new ValueModifier("Breeding", "ADD", game.resources.ants.production_rate);
    ants_breeding_production.value_function = function() {
        this.value = game.resources.ants.amount.value.sqrt().div(5);
    }

    ants_over_carrying_capacity = new ValueModifier("Over Carrying Capacity", "MULT", game.resources.ants.production_rate);
    ants_over_carrying_capacity.value_function = function() {
        var surplus = game.resources.ants.amount.value.sub(game.values.ant_carrying_capacity.value);
        if (surplus.lte(0)) {
            this.value = new Decimal('1');
        }
        else {
            this.value = new Decimal('0.95').pow(surplus);
        }
    }





    // lock declarations
    lock_50_ants = new Lock("50_ants", true);
    lock_50_ants.unlock_criteria = function() {
        return game.resources.ants.amount.value.gte('50') ? true : false;
    }

    lock_80_ants = new Lock("80_ants", true);
    lock_80_ants.unlock_criteria = function() {
        return game.resources.ants.amount.value.gte('80') ? true : false;
    }
});


