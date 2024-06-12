class Value {
    constructor(name, initial_value) {
        this.name = name;
        this.value = initial_value;

        this.value_string = "UNSETVALUE " + this.name;

        this.value_modifiers = [];
        var base_modifier = new ValueModifier("Base", "BASE", this);
        base_modifier.value = initial_value;

        game.values[this.name] = this;
    }

    add_value_modifier(modifier) {
        this.value_modifiers.push(modifier);
    }

    apply_value_modifiers() {
        this.value = new Decimal(0);
        for (var mod in this.value_modifiers) {
            this.value = this.value_modifiers[mod].apply_modifier(this.value);
        }
    }

    update_value_string() {
        this.value_string = format_value(this.value);
    }

    update_displays() {
        this.update_value_string();
        $(".display-" + this.name + "-value_string").html(this.value_string);
        //console.log((".display-" + this.name + "-value_string"));
    }

    get_base_modifier() {
        return this.value_modifiers[0];
    }
}