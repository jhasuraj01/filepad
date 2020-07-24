const toolbarFileBtn = document.getElementById("toolbar-file-btn");
const toolbarShareBtn = document.getElementById("toolbar-share-btn");
var filePopup = document.getElementById("file-popup");
var sharePopup = document.getElementById("share-popup");

function popupHandler(trigger, popup) {
    trigger.addEventListener("mousedown", function () {
        popup.classList.add("active-popup-menu")
        function handle(e) {
            console.log(e);
            if (e.target !== trigger) {
                popup.classList.remove("active-popup-menu");
                document.removeEventListener("mousedown", handle);
            }
        }
        document.addEventListener("mousedown", handle)
    })
}

popupHandler(toolbarFileBtn, filePopup);
popupHandler(toolbarShareBtn, sharePopup);