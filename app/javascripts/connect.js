import { default as Web3 } from 'web3';

var Connection = {
    start: function() {
        var connectionAddress = prompt("Please enter the Node IP address", "http://localhost:8545");

        if (connectionAddress != null) {
          window.web3 = new Web3(new Web3.providers.HttpProvider(connectionAddress));
        } else {
          window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}

module.exports = Connection
