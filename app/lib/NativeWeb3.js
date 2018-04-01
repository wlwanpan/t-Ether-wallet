import { AsyncStorage } from 'react-native'
import { default as SHA256 } from 'crypto-js/sha256'
import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

export default class NativeWeb3 {

  constructor() {
    this.pinHashKey = '@tEtherWallet:securityPinCodeHash'
    this.mnemonicKey = '@tEtherWallet:mnemonicBackup'
    this.web3 = undefined
  }

  validateInfuraToken(_domain, _token) {
    return new Promise(async (resolve, reject) => {
      let mnemonic = await AsyncStorage.getItem(this.mnemonicKey)
      let web3 = new Web3(new HDWalletProvider(mnemonic, `https://${_domain}.infura.io/${_token}`))

      web3.eth.getBlockNumber((err, result) => err ? resolve(false) : resolve(true))
    })
  }

  aStorePinCode(_pincode) {
    var pinHashAsStr = SHA256(_pincode, { outputLength: 256 }).toString()
    return AsyncStorage.setItem(this.pinHashKey, pinHashAsStr)
  }

  aLoadPinHash() {
   return AsyncStorage.getItem(this.pinHashKey)
  }

  aStoreMnemonic(_mnemonic) {
    return AsyncStorage.setItem(this.mnemonicKey, _mnemonic)
  }

  unlockWallet(_pincode) {
  }

  lockWallet() {
  }

}