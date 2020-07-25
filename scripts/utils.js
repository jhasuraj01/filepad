MouseEvent.prototype.targetWithin = function(realTarget) {
    var parent = this.target;

    if (parent === realTarget) {
        return true;
    }
    while(parent !== realTarget && parent !== document.body) {
        parent = parent.parentElement;
        if (parent === realTarget) {
            return true;
        }
    }
    return false;
}