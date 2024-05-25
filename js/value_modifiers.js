class ValueModifier {
    constructor(name, type, target) {
        this.name = name;
        this.type = type; // possible values: BASE, ADD, MULT, POW
        this.value = this.type == "BASE" || this.type == "ADD" ? new Decimal(0) : new Decimal(1);

        this.value_string = "";

        target.add_value_modifier(this);
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
}



// value modifier declarations
a = new ValueModifier("Base", "BASE", game.resources.ants);
a = new ValueModifier("Breeding", "ADD", game.resources.ants);
a.value = new Decimal('4.41933211258');
a = new ValueModifier("MultExample", "MULT", game.resources.ants);
a.value = new Decimal('57.392102');
a = new ValueModifier("ExpExample", "POW", game.resources.ants);
a.value = new Decimal('1.27');