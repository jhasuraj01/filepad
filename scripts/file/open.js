export default function (closeFilePopUp) {
    // console.log("[Function Call] File Open", closeFilePopUp);
    closeFilePopUp();
    setTimeout(function() {
        fileInput.click();
    }, 150)
}

var fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "text/*";
fileInput.style.display = "none";
fileInput.multiple = false;
document.body.appendChild(fileInput);

fileInput.addEventListener("change", function(event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        document.getElementById("editor").innerText = event.target.result;
    }
    fileReader.readAsText(file);
})