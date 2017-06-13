import Web3 from 'web3'
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
     // Use Mist/MetaMask's provider
     window.web3 = new Web3(web3.currentProvider);
} else {
     console.log('No web3? You should consider trying MetaMask!')
     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 } 


export const ETHEREUM_CLIENT = window.web3 || new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voteEvents","outputs":[{"name":"title","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getUserEvents1","outputs":[{"name":"event_address","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"eventAddress","type":"address"}],"name":"eventStatus","outputs":[{"name":"title","type":"bytes32"},{"name":"isVoted","type":"bool"},{"name":"proposalsList","type":"bytes32[10]"},{"name":"proposalsScores","type":"uint256[10]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"title","type":"bytes32"},{"name":"proposalNames","type":"bytes32[10]"}],"name":"createEvent","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"page","type":"uint8"}],"name":"getUserEvents","outputs":[{"name":"event_addresses","type":"address[10]"},{"name":"event_names","type":"bytes32[10]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"userEvents","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eventAddress","type":"address"},{"name":"proposalNames","type":"bytes32[]"}],"name":"vote","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"}],"name":"logUserEvents","type":"event"}] 

//const contractAddress = '0x8c7a1aad77dc8c65a478f3bde148a3c9c611bd8d';
const contractAddress = '0x640dc057b2e713c4f657d391fb7331f9f596b568';
const contract = ETHEREUM_CLIENT.eth.contract(contractABI).at(contractAddress);

export const CONTRACT = contract;
