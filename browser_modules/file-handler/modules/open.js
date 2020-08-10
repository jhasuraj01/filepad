export default function () {
    try {
        window.chooseFileSystemEntries({
            accept: [{
                description: "Text Files",
                mimeTypes: ['text/*'],
                extensions: ['html', 'htm', 'txt', 'css', 'js', 'json']
            }]
        })
            .then(handle => handle.getFile())
            .then(file => file.text())
            .then(data => document.getElementById("editor").innerText = data)
    } catch (error) {
        console.error(error)
    }
}