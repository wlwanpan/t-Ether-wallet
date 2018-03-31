import { AsyncStorage } from 'react-native'
import { default as SHA256 } from 'crypto-js/sha256'

export default class NativeStore {

  constructor() {
    this.pinHashKey = '@tEtherWallet:securityPinCodeHash'
  }

  aStoreMnemonic(_mnemonic) {

  }

  aStorePinCode(_pincode) {
    var pinHashAsStr = SHA256(_pincode, { outputLength: 256 }).toString()
    return AsyncStorage.setItem(this.pinHashKey, pinHashAsStr)
  }

  // const savedPinCodeHash = await AsyncStorage.getItem('@tEtherWallet:securityPinCodeHash')
  // var pinCodeHash = SHA256(pincode, { outputLength: 256 })
  // var pinCodeHashToStr = pinHash.toString()
  // if (pinCodeHashToStr === savedPinCodeHash) {
  //   return Promise.resolve()
  // }
  // else {
  //   return Promise.reject()
  // }

  async unlockWallet() {
  }

  lockWallet() {
  }

}