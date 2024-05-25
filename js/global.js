var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})





var game = {}
game.tickrate = 32;
game.total_time = 0;
game.resources = {};
a = new Decimal(1);



function tick() {
   game.total_time += 1 / game.tickrate;
    a = a.mul('1.5');
    $(".dsfmk").html(format_value(a));

    for (resource in game.resources) {
      game.resources[resource].update_displays();
      game.resources[resource].apply_production();
    }
}



game_loop = window.setInterval(tick, 1000 / game.tickrate);