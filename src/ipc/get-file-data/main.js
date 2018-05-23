const fs = require("fs");

const getFileDataInit = ({ ipcMain, dialog }) => {

    ipcMain.on('get-file-data', (event, fileName) => {
        
        fs.readFile('file.txt', 'utf8', (err, data) => {
            if (err) {
                event.sender.send('get-file-data-response', {succes: false, err});
            } else {
                event.sender.send('get-file-data-response', {succes: true, data});
            } 
        });
    });

};

module.exports = {
    getFileDataInit,
};
