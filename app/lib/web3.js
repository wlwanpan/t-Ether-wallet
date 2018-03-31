import { AsyncStorage, NativeModules } from 'react-native'
import URL from '../config/url'
import { default as SHA256 } from 'crypto-js/sha256'

export default class Web3 {

  constructor() {
    this.pinCodeHash = undefined
  }

  async unlockWallet(pincode) {
    const savedPinCodeHash = await AsyncStorage.getItem('@tEtherWallet:securityPinCodeHash')
    var pinCodeHash = SHA256(pincode, { outputLength: 256 })
    var pinCodeHashToStr = pinHash.toString()
    if (pinCodeHashToStr === savedPinCodeHash) {
      return Promise.resolve()
    }
    else {
      return Promise.reject()
    }
  }

  lockWallet() {
    this.pinCodeHash = undefined
  }

  generateWalletFile() {
    if (!this.pincode) {
      return Promise.reject('Unlock Wallet First')
    }
    else {
      return new Promise((resolve, reject) => {
        NativeModules.generateWalletFile(this.pinCodeHash, (filename) => {
          resolve(filename)
        })
      })
    }
  }

}