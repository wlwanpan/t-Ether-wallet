import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { default as RandomWords } from 'random-words'

import ViewContainer from '../../components/ViewContainer'
import InputTextField from '../../components/InputTextField'
import Header from '../../components/Header'
import MenuButton from '../../components/MenuButton'

export default class CreateWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mnemonicLimit: 12,
      mnemonic: ''
    }
    this._onCreateHandler = this._onCreateHandler.bind(this)
    this._generateRandomMnemonic = this._generateRandomMnemonic.bind(this)
  }
  _generateRandomMnemonic() {
    this.setState({
      mnemonic: RandomWords(this.state.mnemonicLimit).join(' ')
    })
  }
  _onCreateHandler() {
    Actions.registerInfura({mnemonic: this.state.mnemonic})
  }
  render() {
    return(
      <ViewContainer>
        <Header>{ this.state.mnemonic }</Header>
        <InputTextField
          autoFocus={true}
          placeholder={`Enter ${this.state.mnemonicLimit} Random Words`}
          value={this.state.mnemonic}
          onChangeText={(text) => this.setState({mnemonic: text})}
        />
        <MenuButton title='Generate Random Words' onPressHandler={this._generateRandomMnemonic}/>
        <MenuButton title='Create Wallet' onPressHandler={this._onCreateHandler}/>
      </ViewContainer>
    )
  }
}
