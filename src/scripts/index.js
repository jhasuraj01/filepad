import popupHandler from "./popupHandler.js";

// Import Share Popup Buttons Click Event Handler Class
import SocialShareHandler from "./share/share.js"

var toolbarFileBtn = document.getElementById("toolbar-file-btn");
var toolbarShareBtn = document.getElementById("toolbar-share-btn");
var filePopup = document.getElementById("file-popup");
var sharePopup = document.getElementById("share-popup");
var editor = document.getElementById("editor");

// File Popup Buttons
// var fileNewBtn    = document.getElementById("file-new-btn");
var fileOpenBtn = document.getElementById("file-open-btn");
var fileSaveBtn   = document.getElementById("file-save-btn");
var fileSaveAsBtn = document.getElementById("file-save-as-btn");
// var fileCloseBtn  = document.getElementById("file-close-btn");

// Share Popup Buttons
var shareOnWhatsAppBtn = document.getElementById("share-on-whatsapp-btn");
var shareOnTwitterBtn = document.getElementById("share-on-twitter-btn");
var shareOnEmailBtn = document.getElementById("share-on-email-btn");

// Import File Popup Buttons Click Event Handler Class
if ("chooseFileSystemEntries" in window) {
    loadJSFile("scripts/file-handler.js", function () {
        fileSaveBtn.style.display = "flex"
        initializeFileGUIAndHandler()
    })
} else {
    loadJSFile("scripts/file-handler-classical.js", initializeFileGUIAndHandler)
}

// File Pupup Button Click Handlers
function initializeFileGUIAndHandler(err) {
    // fileNewBtn.addEventListener("click", fileHandler.new);
    // fileOpenBtn.addEventListener("click", fileHandler.open.bind(this, closeFilePopUp));
    fileOpenBtn.addEventListener("click", function () {
        closeFilePopUp();
        setTimeout(function () {
            fileHandler.open()
        }, 150)
    });
    // fileSaveBtn.addEventListener("click", fileHandler.save);
    fileSaveAsBtn.addEventListener("click", function () {
        closeFilePopUp();
        setTimeout(function () {
            fileHandler.saveAs()
        }, 150)
    });
    // fileCloseBtn.addEventListener("click", fileHandler.close);
}

// Share Pupup Button Click Handlers
var shareHandler = new SocialShareHandler(editor);
shareOnWhatsAppBtn.addEventListener("click", shareHandler.onWhatsApp);
shareOnTwitterBtn.addEventListener("click", shareHandler.onTwitter);
shareOnEmailBtn.addEventListener("click", shareHandler.onEmail);

// Menu Popups
var closeFilePopUp = popupHandler(toolbarFileBtn, filePopup);
if ("share" in window.navigator) {
    toolbarShareBtn.addEventListener("click", shareHandler.onNative);
} else {
    var closeSharePopUp = popupHandler(toolbarShareBtn, sharePopup);
}