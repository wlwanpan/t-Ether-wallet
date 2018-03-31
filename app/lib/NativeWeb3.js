import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

import NativeStore from './NativeStore'
import URL from './config'

export default class NativeWeb3 extends NativeStore {

  constructor() {
    super()
    this.web3 = undefined
    this.mnemonic = 'some random words'
  }

  loadProvider(_mnemonic) {
    // this.web3 = new Web3(new HDWalletProvider(_mnemonic, 'https://ropsten.infura.io/FfBvZUqHyUR42R1q9CGc'))
  }

  validateInfuraToken(_domain, _token) {
    return new Promise((resolve, reject) => {
      let web3 = new Web3(new HDWalletProvider(this.mnemonic, `https://${_domain}.infura.io/${_token}`))
      web3.eth.getBlockNumber((err, result) => err ? reject(err) : resolve(result))
    })

  }

}