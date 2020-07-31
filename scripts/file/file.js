// import fileNewFunction from "./new.js";
import fileOpenFunction from "./open.js";
// import fileSaveFunction from "./save.js";
// import fileSaveAsFunction from "./save-as.js";
// import fileCloseFunction from "./close.js";

function FileHandler() {
    return this;
}

FileHandler.prototype = {
    // new: fileNewFunction,
    open: fileOpenFunction,
    // save: fileSaveFunction,
    // saveAs: fileSaveAsFunction,
    // close: fileCloseFunction
}
export default new FileHandler();