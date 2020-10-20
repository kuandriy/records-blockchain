const Joi = require('@hapi/joi');

const blockSchema = Joi.object().keys({
    index: Joi.number().integer().required(),
    nonce: Joi.number().integer().required(),
    transactions: Joi.array().required(),
    previousBlockHash: Joi.string().required(),
    timestamp: Joi.date().timestamp()
}).required();

const transactionSchema = Joi.object().keys({
    parties: Joi.object().required(),
    assets: Joi.object().required(),
}).required();


module.exports = {blockSchema, transactionSchema};