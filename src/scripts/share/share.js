/**
 * 
 * @param {HTMLDivElement} editor 
 */
var textEditor;
function SocialShareHandler(editor) {
    textEditor = editor;
    return this;
}

SocialShareHandler.prototype.onWhatsApp = function () {
    shareAnchor.href = 'https://api.whatsapp.com/send?phone&text=' +
                        encodeURIComponent(textEditor.innerText) +
                        encodeURIComponent("\n\nShared Via NotePad.\nLink: https://jhasuraj.com/notepad/");
    shareAnchor.click();
}
SocialShareHandler.prototype.onTwitter = function () {
    shareAnchor.href = 'https://twitter.com/intent/tweet?text=' +
                        encodeURIComponent(textEditor.innerText) +
                        encodeURIComponent("\n\nShared Via #NotePad\nLink: https://jhasuraj.com/notepad/");
    shareAnchor.click();
}
SocialShareHandler.prototype.onEmail = function () {
    shareAnchor.href = 'mailto:?subject=My Note&body=' +
                        encodeURIComponent(textEditor.innerText) +
                        encodeURIComponent("\n\nShared Via NotePad: https://jhasuraj.com/notepad/");
    shareAnchor.click();
}

var shareAnchor = document.createElement("a");
shareAnchor.href = "#";
shareAnchor.target="new";
shareAnchor.rel="noopener noreferrer";
shareAnchor.style.display = "none";
document.body.appendChild(shareAnchor);

export default SocialShareHandler