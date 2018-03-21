const host = 'ws://localhost:8546'
const contractName = "SimpleStorage"

const fs = require('fs')
const Web3 = require('web3')
const writeFileSync = fs.writeFileSync
const web3 = new Web3(host)
const eth = web3.eth
const c = console
const interf = require(`./${contractName}.json`)["contracts"][`${contractName}.sol:${contractName}`]
const abi       = JSON.parse(interf.abi)
const bytecode  = `0x${interf.bin}`

;(async () => {

  const addresses = await eth.getAccounts()
  const address = addresses[0]
  c.log("address:", address)
  const balance = await eth.getBalance(address)
  c.log("balance:", balance)

  const SimpleStorage = new eth.Contract(abi, { from: address, data: bytecode })

  const txOptions = {
    from: address
  }
  const result = await SimpleStorage.deploy().send(txOptions)
  const contractAddress = result._address
  writeFileSync("contract-address.txt", contractAddress)
  c.log("Contract deployed!")
  process.exit(0)

})()
