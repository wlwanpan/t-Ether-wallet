import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { default as RandomWords } from 'random-words'

import ViewContainer from '../../components/ViewContainer'
import InputTextField from '../../components/InputTextField'
import Header from '../../components/Header'
import MenuButtons from '../../components/MenuButtons'

export default class CreateMnemonic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mnemonicLimit: 12,
      mnemonic: ''
    }
    this._validateMnemonic = this._validateMnemonic.bind(this)
    this._generateRandomMnemonic = this._generateRandomMnemonic.bind(this)
  }
  _generateRandomMnemonic() {
    this.setState({
      mnemonic: RandomWords(this.state.mnemonicLimit).join(' ')
    })
  }
  _validateMnemonic() {
    if (this.state.mnemonic.length == 0) {
      this.props.alert('Mnemonic cannot be empty.')
    }
    else {
      this._onCreateHandler()
    }
  }
  async _onCreateHandler() {
    try {
      await this.props.web3.aStoreMnemonic(this.state.mnemonic)
      Actions.registerInfura()
    }
    catch(err) {
      console.log(err)
    }
  }
  render() {
    return(
      <ViewContainer>
        <Header>{ this.state.mnemonic }</Header>
        <InputTextField
          autoFocus={false}
          placeholder={`Enter ${this.state.mnemonicLimit} Random Words`}
          value={this.state.mnemonic}
          onChangeText={(text) => this.setState({mnemonic: text})}
        />
        <MenuButtons
          buttons= {[
            {key: 'Generate Random Words', action: this._generateRandomMnemonic},
            {key: 'Create Wallet', action: this._validateMnemonic}
          ]}
        />
      </ViewContainer>
    )
  }
}
