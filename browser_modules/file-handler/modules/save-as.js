export default async function () {
    try {
        const handler = await window.chooseFileSystemEntries({
            type: 'save-file',
            accept: [{
                description: "Text Files",
                mimeTypes: ['text/*'],
                extensions: ['html', 'htm', 'txt', 'css', 'js', 'json']
            }]
        })
        const stream = await handler.createWritable()
        await stream.write(new Blob(document.getElementById("editor").innerText.split("")))
        await stream.close()
    } catch (error) {
        console.error(error)
    }
}