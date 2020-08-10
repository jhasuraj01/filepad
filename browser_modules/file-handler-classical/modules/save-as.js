export default function () {
    fileDownloaderAnchorElm.href = URL.createObjectURL(new Blob(document.getElementById("editor").innerText.split("")))
    fileDownloaderAnchorElm.download = "new-file-" + Date.now()+ ".txt"
    fileDownloaderAnchorElm.click()
}

var fileDownloaderAnchorElm = document.createElement("a")
fileDownloaderAnchorElm.style.display = "none"
document.body.appendChild(fileDownloaderAnchorElm)

fileDownloaderAnchorElm.addEventListener("click", function (event) {
    var url = fileDownloaderAnchorElm.href
    setTimeout(function () {
        URL.revokeObjectURL(url)
    }, 1000)
});
