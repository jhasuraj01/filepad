var fileInputElm = document.createElement("input");
fileInputElm.type = "file";
fileInputElm.accept = "text/*";
fileInputElm.style.display = "none";
fileInputElm.multiple = false;
document.body.appendChild(fileInputElm);

fileInputElm.addEventListener("change", function (event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        document.getElementById("editor").innerText = event.target.result;
    }
    fileReader.readAsText(file);
})

export default function () {
    fileInputElm.click();
}