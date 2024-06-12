class Value {
    constructor(name, initial_value) {
        this.name = name;
        this.value = initial_value;

        this.value_string = "UNSETVALUE " + this.name;

        this.value_modifiers = [];
        var base_modifier = new ValueModifier("Base", "BASE", this);
        base_modifier.value = initial_value;

        game.values[this.name] = this;

        this.create_breakdown();
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

    create_breakdown() {
        console.log("its yo boy " + this.name);
        $("#overlays").append(
            "<div class='offcanvas offcanvas-start' tabindex='-1' id='" + this.name + "-breakdown-offcanvas' aria-labelledby='" + this.name + "-breakdown-offcanvasLabel'>" +
                "<div class='offcanvas-header'>" +
                    "<h5 class='offcanvas-title' id='" + this.name + "-breakdown-offcanvasLabel'>Breakdown</h5>" +
                    "<button type='button' class='offcanvas-close' data-bs-dismiss='offcanvas' aria-label='Close'>&#10006;</button>" +
                "</div>" +
                "<div class='offcanvas-body'>" +
                    "<table class='table table-dark'>" +
                        "<thead>" +
                            "<tr>" +
                                "<th> Factor </th>" +
                                "<th> Effect </th>" +
                                "<th> Total </th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody class='breakdown-" + this.name + " table-group-divider'>" +
                        "</tbody>" +
                    "</table>" +
                "</div>" +
            "</div>"
        );
    }

    update_breakdown() {
        var table_html = "";
        var running_total = new Decimal(0);
        for (var mod in this.value_modifiers) {
            if (this.value_modifiers[mod].is_effectual()) {
                this.value_modifiers[mod].is_negative() ? table_html += "<tr class='color-negative-modifier'>" : table_html += "<tr>";

                table_html += "<td>" + this.value_modifiers[mod].name + "</td>";

                table_html += "<td>" + this.value_modifiers[mod].value_string + "</td>";

                running_total = this.value_modifiers[mod].apply_modifier(running_total);
                table_html += "<td>" + format_value_with_decimal(running_total) + "</td>";

                table_html += "</tr>";
            }
            
        }
        $(".breakdown-" + this.name).html(table_html);
    }
}