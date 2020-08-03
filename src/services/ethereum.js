import Web3 from "web3";
import sigUtil from 'eth-sig-util'
const ethUtil = require('ethereumjs-util') 

export const connectMetamask = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true
    }
    return false
}
export const getAddress = () => {
    if(!window.ethereum.selectedAddress) {
        connectMetamask()
        return
    }
    return window.ethereum.selectedAddress
}

export const sign = (message) => {
    console.log("😬",message)
    const msgString = JSON.stringify(message);

    var msg = ethUtil.bufferToHex(new Buffer(msgString, 'utf8'))
    console.log("🚨",msgString,"🍕", msg)

    if(!window.ethereum.selectedAddress) {
        connectMetamask()
        return
    }
    var from = window.ethereum.selectedAddress

    // var params = [from, msgParams]
    var params = [msg, from]
    var method = 'personal_sign'

    return new Promise((resolve, reject) => {
        window.web3.currentProvider.sendAsync({
            method,
            params,
            from,
        }, function (err, result) {
            if (err) return console.dir(err)
            if (result.error) {
                reject(result.error.message)
            }
            if (result.error) return console.error('ERROR', result)
            resolve(result.result)
        })
    })
}