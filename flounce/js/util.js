var clamp = function(a, min, max) {
    var newVal = a;
    newVal = newVal < min ? min : newVal;
    newVal = newVal > max ? max : newVal;
    return newVal;
}
