// import fileNewFunction from "./modules/new.js";
import fileOpenFunction from "./modules/open.js";
// import fileSaveFunction from "./modules/save.js";
import fileSaveAsFunction from "./modules/save-as.js";
// import fileCloseFunction from "./modules/close.js";

function FileHandler() {
    return this
}
FileHandler.prototype = {
    // new: fileNewFunction,
    open: fileOpenFunction,
    saveAs: fileSaveAsFunction,
    // close: fileCloseFunction
}
window.fileHandler = new FileHandler()