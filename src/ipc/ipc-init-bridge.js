const { getFileDataInit } = require('./get-file-data/main');

module.exports = (electron) => {
    getFileDataInit(electron);
}