
function Point(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

Point.prototype.apply = function(v) {
    return new Point(this.x + v.dx, this.y + v.dy);
};

Point.prototype.round = function() {
    return new Point(Math.round(this.x), Math.round(this.y));
};

