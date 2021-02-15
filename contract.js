(async () => {
    const Web3 = require('web3');
    const web3 = new Web3("http://localhost:8545");

    const accounts = await web3.eth.getAccounts()
    var listOfCandidates = ['Jason', 'Amy', 'John'];

    const fs = require('fs');
    const bytecode = fs.readFileSync('Voting_sol_Voting.bin').toString();
    const abi = JSON.parse(fs.readFileSync('Voting_sol_Voting.abi').toString());


    const deployedContract = await new web3.eth.Contract(abi);

    deployedContract.deploy({
        data: bytecode,
        arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
    }).send({
        from: accounts[0],
        gas: 1500000,
        gasPrice: web3.utils.toWei('0.00003', 'ether')
    }).then((newContractInstance) => {
        deployedContract.options.address = newContractInstance.options.address;
        console.log(newContractInstance.options.address);
    })
})();



