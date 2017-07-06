import { default as Web3 } from 'web3';

var Connection = {
    start: function() {
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}

module.exports = Connection
