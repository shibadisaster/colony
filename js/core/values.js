class Value {
    constructor(name, value) {
        this.name = name;
        this.value = value;

        this.value_modifiers = [];
        var base_modifier = new ValueModifier("Base", "BASE", this);
        base_modifier.value = value;

        game.values[this.name] = this;
    }

    add_value_modifier(modifier) {
        this.value_modifiers.push(modifier);
    }
}