
// Handel Events
const EventEmitter = require('events');
const responses = require('./response');
class ExtendedEventEmitter extends EventEmitter{};
BlockChainEventEmitter = new ExtendedEventEmitter()
for(let event in responses){
    BlockChainEventEmitter.on(event, responses[event]);
}
module.exports = BlockChainEventEmitter;
