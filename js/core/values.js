class Value {
    constructor(name, value) {
        this.name = name;
        this.value = value;

        this.value_string = "UNSETVALUE " + this.name;

        this.value_modifiers = [];
        var base_modifier = new ValueModifier("Base", "BASE", this);
        base_modifier.value = value;

        game.values[this.name] = this;
    }

    add_value_modifier(modifier) {
        this.value_modifiers.push(modifier);
    }

    update_value_string() {
        this.value_string = format_value(this.value);
    }

    update_displays() {
        this.update_value_string();
        $(".display-" + this.name + "-value_string").html(this.value_string);
        console.log((".display-" + this.name + "-value_string"));
    }
}