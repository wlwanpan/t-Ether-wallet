import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { default as RandomWords } from 'random-words'

import ViewContainer from '../../components/ViewContainer'
import InputTextField from '../../components/InputTextField'
import Header from '../../components/Header'
import MenuButton from '../../components/MenuButton'

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
      Alert.alert(
        'Mnemonic Error',
        'Cannot be empty',
        [
          {text: 'Cancel', onPress: () => console.log('cancel dialog'), style: 'cancel'},
        ],
        { cancelable: false }
      )
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
          autoFocus={true}
          placeholder={`Enter ${this.state.mnemonicLimit} Random Words`}
          value={this.state.mnemonic}
          onChangeText={(text) => this.setState({mnemonic: text})}
        />
        <MenuButton title='Generate Random Words' onPressHandler={this._generateRandomMnemonic}/>
        <MenuButton title='Create Wallet' onPressHandler={this._validateMnemonic}/>
      </ViewContainer>
    )
  }
}
