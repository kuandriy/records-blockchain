const { logger } = require("../../utils");

module.exports = {
    error: (error) => {
        error.data = error.data || error;
        error.message = error.message || error;
        logger(error.data);
        throw (error.message);
    }
}