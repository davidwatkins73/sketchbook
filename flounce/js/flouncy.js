console.log("Hello world!!");

var canvas = document.getElementById("canvas");
var canvasWrapper = document.getElementById("canvas-wrapper");
var ctx = canvas.getContext("2d");

var img1 = document.getElementById('bees');


console.log(canvasWrapper);

img1.onload = function() {
    loop();
    setInterval(loop, 1000 / 30);
};


var world = {
    player: new Bee()
}

$(document).bind("keydown", "w", function() { world.player.flap(); });


var leftFrames = {
    med: 0,
    high: 32,
    low: 64
};

var debug = function(ctx) {
    var tmpl = "x: <%=position.x%>, y: <%=position.y%>, dx: <%=heading.dx%>, dy: <%=Number(heading.dy).toFixed(2)%>";
    var txt = _.template(tmpl, world.player);
    ctx.fillText(txt, 400, 10)
};

var draw = function(ctx) {
    world.player.draw(ctx);
};

var loop = function() {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    update(world.player);
    draw(ctx);
    debug(ctx);
};


var ctr = 0;

var applyScreenConstraints = function(player) {
    var position = player.position;
    var nx = position.x;
    var ny = position.y;
    if (position.x > canvas.width) nx = 0;
    if (position.x < -32) nx = canvas.width;
    if (position.y > canvas.height) {
        ny = canvas.height;
    }
    if (position.y < 0) {
        ny = 0;
        player.heading = new Vector(player.heading.dx, Math.abs(player.heading.dy * 0.2));
    }

    return new Point(nx, ny);
};

var update = function(p) {

    p.heading = p.heading.apply(vectors.gravity);
    p.position = p.position.apply(p.heading);
    p.position = applyScreenConstraints(p);
    p.position = p.position.round();

    // canvas limits

    // speed limits

    p.heading = p.heading.clampY(-10, 10);

};

var turnRight = function(p) {
    p.direction = 'right';
    p.dx += 1;
};

var turnLeft = function(p) {
    p.direction = 'left';
    p.dx += -1;
};

var flap = function(p) {
    p.heading = p.heading.apply(vectors.flap, true, false);
};



