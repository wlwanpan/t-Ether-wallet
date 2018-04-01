import React, { Component } from 'react'
import { View, Linking } from 'react-native'
import { Actions } from 'react-native-router-flux'

import ViewContainer from '../../components/ViewContainer'
import MenuButtons from '../../components/MenuButtons'
import Header from '../../components/Header'
import InputTextField from '../../components/InputTextField'
import { default as _ } from 'underscore'

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
  }
  componentDidMount() {
    this.setState({ropsten: {...this.state.ropsten, autoFocus: true}})
  }
  async _storeToken() {
    var tokenPairs = _(this.state).chain().map((domain) => domain.token)
    var data = tokenPairs.pairs().map((tokenPair) => [`@tEtherWallet:${tokenPair[0]}`, tokenPair[1]]).value()
    try {
      await AsyncStorage.multiSet(data)
      Actions.reset('main')
    }
    catch(err) {
      this.props.alert(err)
    }
  }
  async _validateToken(domain) {
    try {
      var isValid = await this.props.web3.validateInfuraToken(domain, this.state[domain].token)
      switch (domain) {
        case 'ropsten': return this.setState({ ropsten: {...this.state.ropsten, valid: isValid} })
        case 'rinkeby': return this.setState({ rinkeby: {...this.state.rinkeby, valid: isValid} })
        case 'kovan': return this.setState({ kovan: {...this.state.kovan, valid: isValid} })
      }
    }
    catch(err) {
      console.log(err)
    }
  }
  async _validateTokens() {
    // if token valid then store
  }
  render() {
    return(
      <ViewContainer>
        <Header>{'Register Token'}</Header>
        <InputTextField
          label={'Ropsten Network'}
          labelStyle={this.state.ropsten.valid ? 'positive' : 'default'}
          autoFocus={this.state.ropsten.autoFocus}
          placeholder="Enter Ropsten Token"
          onChangeText={(text) => this.setState({ropsten: {...this.state.ropsten, token: text}})}
          onEndEditing={() => this._validateToken('ropsten')}
        />
        <InputTextField
          label='Rinkeby Network'
          labelStyle={this.state.rinkeby.valid ? 'positive' : 'default'}
          autoFocus={this.state.rinkeby.autoFocus}
          placeholder="Enter Rinkeby Token"
          onChangeText={(text) => this.setState({rinkeby: {...this.state.rinkeby, token: text}})}
          onEndEditing={() => this._validateToken('rinkeby')}
        />
        <InputTextField
          label='Kovan Network'
          labelStyle={this.state.kovan.valid ? 'positive' : 'default'}
          autoFocus={this.state.kovan.autoFocus}
          placeholder="Enter Kovan Token"
          onChangeText={(text) => this.setState({kovan: {...this.state.kovan, token: text}})}
          onEndEditing={() => this._validateToken('kovan')}
        />
        <View>
          <MenuButtons
            buttons={[
              {key: 'Register Token', action: () => this._validateTokens()},
              {key: 'What is Infura ?', action: () => Linking.openURL('https://infura.io/')}
            ]}
          />
        </View>
      </ViewContainer>
    )
  }
}
