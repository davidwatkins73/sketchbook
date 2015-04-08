
function Vector(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    return this;
}

Vector.prototype.clampX = function(min, max) {
    var newVal = clamp(this.dx, min, max);
    return newVal == this.dx ? this : new Vector(newVal, this.dy);
};

Vector.prototype.clampY = function(min, max) {
    var newVal = clamp(this.dy, min, max);
    return newVal == this.dy ? this : new Vector(this.dx, newVal);
};

Vector.prototype.clamp = function(v) {
    return new Vector(
        this.dx > c.dx ? v.dx : this.dx,
        this.dy > v.dy ? v.dy : this.dy
    );
};

Vector.prototype.apply = function(v, progradeX, progradeY) {
    var dx = progradeX ? Math.sign(this.dx) * v.dx : v.dx;
    var dy = progradeY ? Math.sign(this.dy) * v.dy : v.dy;

    return new Vector(this.dx + dx, this.dy + dy);
};

Vector.prototype.speed = function() {
    return Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
};

var vectors = {
    gravity : new Vector(0, 0.2),
    flap: new Vector(1, -3)
};


