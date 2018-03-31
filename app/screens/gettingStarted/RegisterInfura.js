import React, { Component } from 'react'
import { View, Linking, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import URL from '../../config/url'
import EscapeViewContainer from '../../components/EscapeViewContainer'
import MenuButton from '../../components/MenuButton'
import Header from '../../components/Header'
import InputTextField from '../../components/InputTextField'
import { default as _ } from 'underscore'

export default class RegisterInfura extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tokens: {
        ropstenToken: '',
        rinkebyToken: '',
        kovanToken: ''
      },
      autoFocus: {
        ropsten: false,
        rinkeby: false,
        kovan: false
      }
    }
    this._validateToken = this._validateToken.bind(this)
  }
  componentDidMount() {
    this.setState({autoFocus: { ropsten: true }})
  }
  async _storeToken() {
    var tokenPairs = _(this.state.tokens).chain().pairs().map((tokenPair) => [`@tEtherWallet:${tokenPair[0]}`, tokenPair[1]]).value()
    try {
      await AsyncStorage.multiSet(tokenPairs)
      Actions.reset('main')
    }
    catch(err) {
      console.log(err)
    }
  }
  async _validateToken() {
    // var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    // let web3 = new Web3(new HDWalletProvider(this.props.mnemonic, URL.ropsten))
    debugger
    // let hashRate = await web3.eth.getGasPrice()
    // console.log(hashRate)
  }
  render() {
    return(
      <EscapeViewContainer>
        <Header>{'Register Token'}</Header>
        <InputTextField
          label='Ropsten Network'
          autoFocus={this.state.autoFocus.ropsten}
          placeholder="Enter Ropsten Token"
          onChangeText={(text) => this.setState({tokens: {ropstenToken: text}})}
          onSubmitEditing={() => {}}
        />
        <InputTextField
          label='Rinkeby Network'
          autoFocus={this.state.autoFocus.rinkeby}
          placeholder="Enter Rinkeby Token"
          onChangeText={(text) => this.setState({tokens: {rinkebyToken: text}})}
          onSubmitEditing={() => {}}
        />
        <InputTextField
          label='Kovan Network'
          autoFocus={this.state.autoFocus.kovan}
          placeholder="Enter Kovan Token"
          onChangeText={(text) => this.setState({tokens: {kovanToken: text}})}
        />
        <View>
          <MenuButton title='Register Token' onPressHandler={this._validateToken}/>
          <MenuButton title='What is Infura ?' onPressHandler={() => Linking.openURL('https://infura.io/')}/>
        </View>
      </EscapeViewContainer>
    )
  }
}
