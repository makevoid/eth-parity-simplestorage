const host = 'ws://localhost:8546'
const contractName = "SimpleStorage"

const fs = require('fs')
const Web3 = require('web3')
const readFileSync  = fs.readFileSync
const web3 = new Web3(host)
const eth = web3.eth
const c = console
const interf = require(`./${contractName}.json`)["contracts"][`${contractName}.sol:${contractName}`]
const abi       = JSON.parse(interf.abi)
const bytecode  = `0x${interf.bin}`
const contractAddress = readFileSync("contract-address.txt")

;(async () => {

  const addresses = await eth.getAccounts()
  const address = addresses[0]
  c.log("address:", address)
  const balance = await eth.getBalance(address)
  c.log("balance:", balance)

  const simpleStorage = new eth.Contract(abi, contractAddress)

  const txOptions = {
    from: address
  }
  const num = Number(Math.random() * 10000).toFixed(0)
  const resultTx = await simpleStorage.methods.set(`foo-${num}`).send(txOptions)
  c.log(resultTx)
  const result = await simpleStorage.methods.data().call()
  c.log("Data:", result)
  process.exit(0)

})()
