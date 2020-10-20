// Block

const {blockSchema} = require('../schemas');

class Block {
    constructor(data) {
        // Validate block create data
        const { error } = blockSchema.validate(data);
        if (error) {
            throw error;
        }
        const { index, nonce, transactions, previousBlockHash, timestamp } = data;

        this.index = index;
        this.nonce = nonce;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousBlockHash = previousBlockHash;
    }
}
module.exports = Block;