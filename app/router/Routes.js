import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'
import NativeWeb3 from '../lib/NativeWeb3'

import EntryMenu from '../screens/EntryMenu'
import ErrorScreen from '../screens/ErrorScreen'
import CreatePinCode from '../screens/gettingStarted/CreatePinCode'
import CreateMnemonic from '../screens/gettingStarted/CreateMnemonic'
import RegisterInfura from '../screens/gettingStarted/RegisterInfura'

import DashboardScreen from '../screens/main/DashboardScreen'
import ContactScreen from '../screens/main/ContactScreen'

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: new NativeWeb3()
    }
  }
  componentDidMount() {
    this._loadLocalStorage()
  }
  async _loadLocalStorage() {
    try {
      // const pinCodeHash = await AsyncStorage.getItem('@tEtherWallet:securityPinCodeHash')
      // const keys = await AsyncStorage.getAllKeys()

      // Check if Pin Saved
      if (false) {
        Actions.main()
      } else {
        Actions.root()
      }
    }
    catch(err) {
      console.log(err)
    }
  }
  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: '#23272a' }}
        titleStyle={{ color: '#7289da' }}
        navBarButtonColor='white'
        swipeEnabled={true}
        >
        <Scene>
          <Tabs key='root' hideTabBar={true} web3={this.state.web3}>
            <Scene key='gettingStarted' title='Wallet' component={EntryMenu} initial={true} />
            <Scene key='createPinCode' title='Enter Pin' component={CreatePinCode} />
            <Scene key='createMnemonic' title='Create Wallet' component={CreateMnemonic} />
            <Scene key='registerInfura' title='Infura Token' component={RegisterInfura} />
          </Tabs>
          <Tabs key='main' tabBarPosition='bottom' web3={this.state.web3}>
            <Scene key='dashboardScreen' title='Dashboard' component={DashboardScreen} initial={true} />
            <Scene key='contactScreen' title='Contract' component={ContactScreen} />
            <Scene key='errorScreen' title='Error' component={ErrorScreen} />
          </Tabs>
        </Scene>
      </Router>
    )
  }
}