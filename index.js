web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

contract = new web3.eth.Contract(abi);
function setContractAddress(address) {
    contractAddress = $("#address").val();
    contract.options.address = contractAddress;
    console.log(contractAddress);

    candidateNames = Object.keys(candidates);

    for(var i=0; i<candidateNames.length; i++) {
        let name = candidateNames[i];

        contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
         $("#" + candidates[name]).html(f);
        })
    }
}
// contract.options.address = "0x89a8941b446988277A2E66A0E01Fd77299aA8591";
// update this contract address with your contract address

candidates = {"Jason": "candidate-1", "Amy": "candidate-2", "John": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);

 contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
  let div_id = candidates[candidateName];
  contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
   $("#" + div_id).html(f);
  })
 })
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
     let name = candidateNames[i];

     contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
      $("#" + candidates[name]).html(f);
     })
 }
});
