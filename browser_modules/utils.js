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

window.loadJSFile = function (path, callback) {
    /* 1st Argument of callback will be error if exists any */
    try {
        var script = document.createElement("script")
        script.src = path
        script.id = path
        script.onload = callback.bind(this, false, script)
        document.body.appendChild(script)
    } catch (error) {
        callback(error)
    }
}