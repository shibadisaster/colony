class ValueModifier {
    constructor(name, type, target) {
        this.name = name;
        this.type = type; // possible values: BASE, ADD, MULT, POW
        this.value = this.type == "BASE" || this.type == "ADD" ? new Decimal(0) : new Decimal(1);

        this.value_string = "";

        this.value_function = function() {
            this.value = this.value;
        }

        target.add_value_modifier(this);
        game.value_modifiers[target.name + ":" + this.name] = this;
    }

    update_value_string() {
        this.value_string = ""
        switch (this.type) {
            case "BASE":
                this.value_string += format_value_with_decimal(this.value);
                break;
            case "ADD":
                this.value_string += "&plus;";
                this.value_string += format_value_with_decimal(this.value);
                break;
            case "MULT":
                this.value_string += "&times;";
                this.value_string += format_value_with_decimal(this.value);
                break;
            case "POW":
                this.value_string += "x<sup>";
                this.value_string += format_value_with_decimal(this.value);
                this.value_string += "</sup>";
                break;
        }
    }

    apply_modifier(d) { // decimal input
        switch (this.type) {
            case "BASE":
                return this.value;
            case "ADD":
                return d.add(this.value);
            case "MULT":
                return d.mul(this.value);
            case "POW":
                return d.pow(this.value);
        }
    }

    is_effectual() { // returns if the valuemodifier has any effect on its value or not (i.e. check for x + 0 = x, x * 1 = x, etc)
        if (this.type == "BASE") {
            return true;
        }
        if ((this.type == "ADD" && this.value.eq(0)) || (this.type == "MULT" && this.value.eq(1)) || (this.type == "POW" && this.value.eq(1))) {
            return false;
        }
        return true;
    }

    is_negative() { // returns if the valuemodifier has a negative effect
        if (this.type == "BASE") {
            return false;
        }
        if ((this.type == "ADD" && this.value.lt(0)) || (this.type == "MULT" && this.value.lt(1)) || (this.type == "POW" && this.value.lt(1))) {
            return true;
        }
        return false;
    }

    update_value() {
        this.value_function();
    }
}