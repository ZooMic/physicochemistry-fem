
const electron = window.require("electron");
const { ipcRenderer } = electron;

const fileName = 'some-file.txt'; // TODO - remove this and pass it in getFileData method

export const getFileData = (callbac) => {
    const channel  = 'get-file-data-response';
    const getFileListener = (event, file) => {
        callbac(event, file);
        ipcRenderer.removeListener(channel, getFileListener);
    };

    ipcRenderer.on(channel, getFileListener);
    ipcRenderer.send('get-file-data', fileName);
}