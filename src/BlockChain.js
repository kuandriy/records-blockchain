// Blockchain

const Block = require('./Block');
const Transaction = require('./Transaction');
const { config } = require('../utils');
const BlockChainEvents = require('../events');
const errors = config.getConfig('chain.errors');
const sha256 = require('sha256');
try {
    require('../boot')();
} catch (error) {
    return BlockChainEvents.emit('error', error);
}

const { blockSchema } = require('../schemas');

class BlockChain {
    constructor() {
        this.chain = [];
        this.transactions = [];
        this.proof = process.env.PROOF_VALUE;
        this.maxTransactions = parseInt(process.env.MAX_TRANSACTIONS);
        // this create genesis block
        this.createGenesisBlock();
    }
    createBlock() {
        const data = {
            index: this.chain.length + 1,
            previousBlockHash: this.hashBlock(this.getLastBlock()),
            transactions: this.transactions.splice(0, this.maxTransactions),
            timestamp: Date.now()
        }
        data.nonce = this.proofOfWork(data);
        try {
            const block = new Block(data);
            this.chain.push({ ...block });
        } catch (error) {
            return BlockChainEvents.emit('error', error);
        }
    }
    createTransaction(args) {
        const data = { ...args };
        try {
            const transaction = new Transaction(data);
            this.transactions.push({ ...transaction });
            if (this.transactions.length === this.maxTransactions) {
                this.createBlock();
            }
            return this.getLastBlock.index + 1;
        } catch (error) {
            return BlockChainEvents.emit('error', error);
        }
    }
    getLastBlock() {
        if (this.chain.length === 0) {
            const error = {
                data: errors.emptyChain,
                message: errors.emptyChain
            }
            return BlockChainEvents.emit('error', error);
        }
        return this.chain[this.chain.length - 1];
    }
    hashBlock(args) {
        const data = { ...args };
        const { error } = blockSchema.validate(data);
        if (error) {
            error.message = error.details[0].message;
            return BlockChainEvents.emit('error', error);
        }
        const { index, previousBlockHash, transactions, nonce } = data;
        try {
            const hashString = index.toString().concat(previousBlockHash, JSON.stringify(transactions), nonce.toString());
            const blockHash = sha256(hashString);
            return blockHash;
        } catch (error) {
            return BlockChainEvents.emit('error', error);
        }
    }
    proofOfWork(args) {
        const data = { ...args };
        data.nonce = -1;
        let hash = '';
        do {
            data.nonce++;
            hash = this.hashBlock(data);
        }
        while (hash.substring(0, this.proof.length) != this.proof);
        return data.nonce;
    }
    createGenesisBlock() {
        const data = {
            index: 1,
            previousBlockHash: "0",
            transactions: [...this.transactions],
            timestamp: Date.now()
        }
        data.nonce = this.proofOfWork(data);
        try {
            const block = new Block(data);
            this.chain.push({ ...block });
        } catch (error) {
            return BlockChainEvents.emit('error', error);
        }
    }
}
module.exports = BlockChain;