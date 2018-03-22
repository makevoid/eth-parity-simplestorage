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
const contractAddress = readFileSync("contract-address.txt").toString().trim()
const utils = web3.utils
const stringToHex = utils.stringToHex
const hexToString = utils.hexToString

;(async () => {

  const addresses = await eth.getAccounts()
  const address = addresses[0]
  c.log("address:", address)
  const balance = await eth.getBalance(address)
  c.log("balance:", balance)

  c.log("contractAddress:", contractAddress)

  const simpleStorage = new eth.Contract(abi, contractAddress, )

  const num = Number(Math.random() * 10000).toFixed(0)
  const value = stringToHex(`foo-${num}`)

  const result = await simpleStorage.methods.data().call()
  c.log("Data:", hexToString(result))

  const resultTx = await simpleStorage.methods.set(value).send({ from: address })
  // c.log(resultTx)
  c.log("TX hash:", resultTx.transactionHash)

  const result2 = await simpleStorage.methods.data().call()
  c.log("Data:", hexToString(result2))
  process.exit(0)

})()
