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

var frames = {
    left: 0,
    right: 32,
    med: 0,
    high: 32,
    low: 64
};

var player = {
    x: 100,
    y: 100,
    dy: 0,
    dx: 0,
    direction: "left",
    frame : [frames.left, frames.med]
};

$(document).bind("keydown", "w", function() { flap(player); });
$(document).bind("keydown", "d", function(e) { turnRight(player); e.stopPropagation(); });
$(document).bind("keydown", "a", function(e) { turnLeft(player); e.stopPropagation(); });

var leftFrames = {
    med: 0,
    high: 32,
    low: 64
};

var debug = function(ctx) {
    var tmpl = "x: <%=x%>, y: <%=y%>, dx: <%=dx%>, dy: <%=Number(dy).toFixed(2)%>";
    var txt = _.template(tmpl, player);
    ctx.fillText(txt, 400, 10)
};

var draw = function(ctx) {
    drawPlayer(ctx, player);
};

var drawPlayer = function(ctx, player) {
    drawBee(ctx, player.x, player.y, player.frame);
};

var drawBee = function(ctx, x, y, frame) {
    ctx.drawImage(img1, frame[0], frame[1],  32, 32, x, y, 32, 32);
};

var loop = function() {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    update(player);
    draw(ctx);
    debug(ctx);
};


var ctr = 0;

var update = function(p) {
    ctr ++;

    var keyFrames = [ frames.med, frames.high, frames.med, frames.low];
    p.frame = [
        keyFrames[ctr % keyFrames.length],
        frames.left
    ];
    console.log(p.frame);
    if (ctr > keyFrames.length * 10) ctr = 0;


    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.3;
    if (Math.abs(p.dx) > 0.5) {
        p.dx += (p.direction = 'left' ? 0.03 : -0.03);
    }

    p.x = Math.round(p.x);
    p.y = Math.round(p.y);

    // canvas limits
    if (p.x > canvas.width) p.x = canvas.width;
    if (p.x < -32) p.x = canvas.width;
    if (p.y > canvas.height) p.y = canvas.height;
    if (p.y < 0) p.y = 0;

    // speed limits
    if (p.dy > 10) p.dy = 10;
    if (p.dy < -10) p.dy = -10;

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
    p.dy -= 5;
    p.dx += (p.direction == 'right' ? 0.1 : -0.1);
};



