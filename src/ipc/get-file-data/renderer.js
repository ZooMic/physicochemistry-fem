
const electron = window.require("electron");
const { ipcRenderer } = electron;

const fileName = 'some-file.txt';

export const getFileData = (callbac) => {
    ipcRenderer.on('get-file-data-response', callbac);
    ipcRenderer.send('get-file-data', fileName);
}
