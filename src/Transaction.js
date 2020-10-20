// Block

const {transactionSchema} = require('../schemas');

class Transaction {
    constructor(data) {
        // Validate transaction  data
        const { error } = transactionSchema.validate(data);
        if (error) {
            throw error;
        }
        const { parties, assets } = data;

        this.parties = parties;
        this.assets = assets;
    }
}
module.exports = Transaction;