const fs = require("fs");

const getFileDataInit = ({ ipcMain, dialog }) => {
    
    ipcMain.on('get-file-data', (event, fileName) => {
        event.sender.send('get-file-data-response', 'Some file data');
    });

};

module.exports = {
    getFileDataInit,
};
