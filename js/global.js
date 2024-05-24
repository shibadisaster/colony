var game = {}
game.tickrate = 32;
game.total_time = 0;
game.resources = {};
a = new Decimal(1);



function tick() {
    game.total_time += 1 / game.tickrate;
    a = a.mul('1.5');
    $(".dsfmk").html(format_value(a));
}



game_loop = window.setInterval(tick, 1000 / game.tickrate);