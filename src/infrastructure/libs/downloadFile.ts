// export function downloadFile(fileName: string, fileContent: string) {
  
//   const fileDownloaderAnchorElm = document.createElement('a')
//   fileDownloaderAnchorElm.style.display = 'none'
//   document.body.appendChild(fileDownloaderAnchorElm)

//   setTimeout(() => {
//     fileDownloaderAnchorElm.href = URL.createObjectURL(new Blob(fileContent.split('')))
//     fileDownloaderAnchorElm.download = fileName
//     fileDownloaderAnchorElm.click()
//   }, 0)

//   function destroy() {
//     const url = fileDownloaderAnchorElm.href
//     setTimeout(function () {
//       URL.revokeObjectURL(url)
//     }, 1000)
//     fileDownloaderAnchorElm.removeEventListener('click', destroy)
//     fileDownloaderAnchorElm.parentNode?.removeChild(fileDownloaderAnchorElm)
//   }

//   fileDownloaderAnchorElm.addEventListener('click', destroy)
// }

export function downloadFile(fileName: string, fileContent: string) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent))
  element.setAttribute('download', fileName)
  
  element.style.display = 'none'
  document.body.appendChild(element)
  
  element.click()
  
  document.body.removeChild(element)
}