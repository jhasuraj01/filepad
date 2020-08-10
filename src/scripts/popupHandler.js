export default function popupHandler(trigger, popup) {
    trigger.addEventListener("mouseup", showPopUp)
    function showPopUp() {
        popup.classList.add("active-popup-menu")
        trigger.removeEventListener("mouseup", showPopUp)

        setTimeout(function () {
            document.addEventListener("mousedown", closePopUp)
        }, 150);
    }
    var closePopUp = function(e) {
        if (!e || (e.target !== trigger && !e.targetWithin(popup))) {
            popup.classList.remove("active-popup-menu");
            document.removeEventListener("mousedown", closePopUp);
            trigger.addEventListener("mouseup", showPopUp)
        }
    };
    return closePopUp;
}