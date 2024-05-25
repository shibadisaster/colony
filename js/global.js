var game = {}
game.tickrate = 32;
game.total_time = 0;
game.resources = {};



function tick() {
    game.total_time += 1 / game.tickrate;

    for (resource in game.resources) {
        game.resources[resource].update_displays();
        game.resources[resource].apply_production();
}
}



$(document).ready(function () {
    gameloop = window.setInterval(tick, 1000 / game.tickrate);
    console.log("Loop started!");
});