var game = {}
game.tickrate = 50;
game.total_time = 0;

game.resources = {};
game.value_modifiers = {};
game.values = {};
game.locks = {};



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

    $(".locked-by-default").hide();
    $(".unlocked-by-default").show();
    for (lock in game.locks) {
        game.locks[lock].update_locks();
    }
}1



$(document).ready(function () {
    gameloop = window.setInterval(tick, 1000 / game.tickrate);
    console.log("Loop started!");
});