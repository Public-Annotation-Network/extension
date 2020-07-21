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

export const signV4 = () => {

    // const msgParams = JSON.stringify({
    //     domain: {
    //         chainId: 1,
    //         name: 'Ether Mail',
    //         verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    //         version: '1'
    //     },
    //     message: {
    //         contents: 'Hello, Bob!',
    //         from: {
    //             name: 'Cow',
    //             wallets: [
    //                 '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    //                 '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
    //             ]
    //         },
    //         to: [
    //             {
    //                 name: 'Bob',
    //                 wallets: [
    //                     '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    //                     '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
    //                     '0xB0B0b0b0b0b0B000000000000000000000000000'
    //                 ]
    //             }
    //         ]
    //     },
    //     primaryType: 'Mail',
    //     types: {
    //         EIP712Domain: [
    //             { name: 'name', type: 'string' },
    //             { name: 'version', type: 'string' },
    //             { name: 'chainId', type: 'uint256' },
    //             { name: 'verifyingContract', type: 'address' }
    //         ],
    //         Group: [{ name: 'name', type: 'string' }, { name: 'members', type: 'Person[]' }],
    //         Mail: [
    //             { name: 'from', type: 'Person' },
    //             { name: 'to', type: 'Person[]' },
    //             { name: 'contents', type: 'string' }
    //         ],
    //         Person: [{ name: 'name', type: 'string' }, { name: 'wallets', type: 'address[]' }]
    //     }
    // });

    const msg2 = { "@context": ["https://pan.network/annotation/v1"], "credentialSubject": { "annotation": "text..", "content": "uri:tweet:joaosantos/1281904943700619265" }, "issuanceDate": "2010-01-01T19:23:24Z", "issuer": "urn:ethereum:0xaBfEEA201208fcD0eE6a7073dFF0141dd7D7B04c", "proof": { "created": "2017-06-18T21:19:10Z", "proofPurpose": "PANSubmission", "type": "EthereumECDSA", "verificationMethod": "urn:ethereum:0xbdda0c603b93571e089c63d96ab4914e00198aa8fba40a0c394a949c5c3b549fa643651f407ce8378cf7505ea9563d03117691a56a6b7c9e22ac9fd983bc55b8" }, "type": ["VerifiableCredential", "PANCredential"] }
    const msgString = JSON.stringify(msg2, Object.keys(msg2).sort());

    var msg = ethUtil.bufferToHex(new Buffer(msgString, 'utf8'))

    console.log("🚨",msgString,"🍕", msg)

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