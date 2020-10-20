// Utils
const configData = require("./config.json");

function logger(message) {
    const timeStamp = Date.now();
    console.log(timeStamp, " | ",  message);
}

function ConfigWrapper() {
    this.data = configData;
}

ConfigWrapper.prototype.getConfig = function (key) {
    // key = top.sub.sub
    key = key.split('.');
    let data = this.data;
    for (let k of key) {
        data = data[k];
    }
    return { ...data };
}

const config = new ConfigWrapper();

module.exports = { logger, config };