import React, {Component} from 'react';
import Web3 from 'web3'
import {
    Link
} from 'react-router-dom'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractABI = [{
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "voteEvents",
    "outputs": [{"name": "title", "type": "bytes32"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "eventAddress", "type": "address"}],
    "name": "eventStatus",
    "outputs": [{"name": "title", "type": "bytes32"}, {
        "name": "proposalsList",
        "type": "bytes32[10]"
    }, {"name": "proposalsScores", "type": "uint256[10]"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "page", "type": "uint8"}],
    "name": "userEvents",
    "outputs": [{"name": "event_addresses", "type": "address[10]"}, {"name": "event_names", "type": "bytes32[10]"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "title", "type": "bytes32"}, {"name": "proposalNames", "type": "bytes32[10]"}],
    "name": "createEvent",
    "outputs": [{"name": "sufficient", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "userEvents",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "eventAddress", "type": "address"}, {
        "name": "voterName",
        "type": "bytes32"
    }, {"name": "proposalNames", "type": "bytes32[]"}],
    "name": "vote",
    "outputs": [{"name": "sufficient", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}]
var contractAddress = '0x8c7a1aad77dc8c65a478f3bde148a3c9c611bd8d'
var contract = ETHEREUM_CLIENT.eth.contract(contractABI).at(contractAddress);


class MainSection extends Component {
    componentWillMount() {
        console.log(ETHEREUM_CLIENT.eth.defaultAccount)
        var data = contract.eventStatus.call(ETHEREUM_CLIENT.eth.accounts);
        console.log(data)
        var title = data[1]
        this.setState({title: ETHEREUM_CLIENT.toUtf8(title)});
    }

    render() {
        return (
            <div>{this.state.title}</div>
        );
    }
}

export default MainSection;
