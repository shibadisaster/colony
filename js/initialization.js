// resource declarations
ants = new Resource("ant", "ants");
ants.amount = new Decimal(2);



// value declarations
carrying_capacity = new Value("ant_carrying_capacity", new Decimal(50));



// value modifier declarations
ants_base_production = new ValueModifier("Base", "BASE", game.resources.ants);

ants_breeding_production = new ValueModifier("Breeding", "ADD", game.resources.ants);
ants_breeding_production.value_function = function() {
    this.value = game.resources.ants.amount.sqrt().div(5);
}

ants_over_carrying_capacity = new ValueModifier("Over Carrying Capacity", "MULT", game.resources.ants);
ants_over_carrying_capacity.value_function = function() {
    var surplus = game.resources.ants.amount.sub(game.values.ant_carrying_capacity.value);
    console.log(surplus.toFixed());
    if (surplus.lte(0)) {
        this.value = new Decimal(1);
    }
    else {
        this.value = new Decimal('0.95').pow(surplus);
    }
}