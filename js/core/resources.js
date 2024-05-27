class Resource {
    constructor(singular_name, plural_name) {
        this.singular_name = singular_name;
        this.plural_name = plural_name;
        this.name = plural_name;

        this.amount = new Decimal(0);

        this.value_string = "UNSETVALUE " + this.name;
        this.update_value_string();

        this.production_rate = new Decimal(0); // per second
        this.production_modifiers = [];

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
        $(".display-" + this.name + "-production_rate").html(format_value_with_decimal(this.production_rate) + " " + this.name + "/s");
        this.update_production_display();
    }

    update_production_display() {
        var table_html = "";
        var running_total = new Decimal(0);
        for (var mod in this.production_modifiers) {
            if (this.production_modifiers[mod].is_effectual()) {
                table_html += "<tr>";
                table_html += "<td>" + this.production_modifiers[mod].name + "</td>";

                table_html += "<td>" + this.production_modifiers[mod].value_string + "</td>";

                running_total = this.production_modifiers[mod].apply_modifier(running_total);
                table_html += "<td>" + format_value_with_decimal(running_total) + "/s </td>";
                table_html += "</tr>";
            }
            
        }
        $(".production-breakdown-" + this.name).html(table_html);
    }

    apply_production() {
        this.update_production_rate();
        this.amount = this.amount.add(this.production_rate.div(game.tickrate));
    }

    update_production_rate() {
        this.production_rate = new Decimal(0);
        for (var mod in this.production_modifiers) {
            this.production_rate = this.production_modifiers[mod].apply_modifier(this.production_rate);
        }
    }

    add_value_modifier(modifier) {
        this.production_modifiers.push(modifier);
    }
}