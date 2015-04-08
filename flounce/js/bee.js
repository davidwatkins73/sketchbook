
var frameMap = []

function Bee() {
    this.position = new Point(100, 100);
    this.heading = new Vector(2, 0);
    this.glyph = {
        facing : "left",
        frame: 'med'
    };
};

Bee.prototype.flap = function() {
    this.heading = this.heading.apply(new Vector(0.3, -5), true, false);
};

Bee.prototype.draw = function(ctx) {
    ctx.drawImage(img1, 0, 0,  32, 32, this.position.x, this.position.y, 32, 32);
};