var game = {}
game.tickrate = 50;
game.total_time = 0;

game.resources = {};
game.value_modifiers = {};
game.values = {};



function tick() {
    game.total_time += 1 / game.tickrate;

    for (resource in game.resources) {
        game.resources[resource].update_displays();
        game.resources[resource].apply_production();
    }

    for (value_modifier in game.value_modifiers) {
        game.value_modifiers[value_modifier].update_value();
        game.value_modifiers[value_modifier].update_value_string();
    }

    for (value in game.values) {
        game.values[value].update_value_string();
        game.values[value].update_displays();
    }
}



$(document).ready(function () {
    gameloop = window.setInterval(tick, 1000 / game.tickrate);
    console.log("Loop started!");
});