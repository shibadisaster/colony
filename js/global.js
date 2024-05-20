var game = {}
game.tickrate = 50;
game.total_time = 0;
game.resources = {};



function tick() {
    game.total_time += 1 / game.tickrate;
}



game_loop = window.setInterval(tick, 1000 / game.tickrate);