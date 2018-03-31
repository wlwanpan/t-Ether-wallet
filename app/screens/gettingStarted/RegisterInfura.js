import React, { Component } from 'react'
import { View, Linking, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import EscapeViewContainer from '../../components/EscapeViewContainer'
import MenuButton from '../../components/MenuButton'
import Header from '../../components/Header'
import InputTextField from '../../components/InputTextField'
import { default as _ } from 'underscore'
import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

export default class RegisterInfura extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ropsten: {
        token: '',
        valid: false,
        autoFocus: false
      },
      rinkeby: {
        token: '',
        valid: false,
        autoFocus: false
      },
      kovan: {
        token: '',
        valid: false,
        autoFocus: false
      }
    }
    this._validateToken = this._validateToken.bind(this)
  }
  componentDidMount() {
    this.setState({autoFocus: { ropsten: true }})
  }
  async _storeToken() {
    var tokenPairs = _(this.state).chain().map((domain) => domain.token)
    var data = tokenPairs.pairs().map((tokenPair) => [`@tEtherWallet:${tokenPair[0]}`, tokenPair[1]]).value()
    try {
      await AsyncStorage.multiSet(data)
      Actions.reset('main')
    }
    catch(err) {
      console.log(err)
    }
  }
  async _validateToken() {
    console.log(this.props.mnemonic)
    // FfBvZUqHyUR42R1q9CGc
    this.props.web3.validateInfuraToken() // domain, token
  }
  render() {
    return(
      <EscapeViewContainer>
        <Header>{'Register Token'}</Header>
        <InputTextField
          label='Ropsten Network'
          autoFocus={this.state.ropsten.autoFocus}
          placeholder="Enter Ropsten Token"
          onChangeText={(text) => this.setState({ropsten: {token: text}})}
          onSubmitEditing={() => {}}
        />
        <InputTextField
          label='Rinkeby Network'
          autoFocus={this.state.rinkeby.autoFocus}
          placeholder="Enter Rinkeby Token"
          onChangeText={(text) => this.setState({rinkeby: {token: text}})}
          onSubmitEditing={() => {}}
        />
        <InputTextField
          label='Kovan Network'
          autoFocus={this.state.kovan.autoFocus}
          placeholder="Enter Kovan Token"
          onChangeText={(text) => this.setState({kovan: {token: text}})}
        />
        <View>
          <MenuButton title='Register Token' onPressHandler={this._validateToken}/>
          <MenuButton title='What is Infura ?' onPressHandler={() => Linking.openURL('https://infura.io/')}/>
        </View>
      </EscapeViewContainer>
    )
  }
}
