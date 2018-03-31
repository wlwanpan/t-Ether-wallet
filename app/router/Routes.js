import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'

import EntryMenu from '../screens/EntryMenu'
import ErrorScreen from '../screens/ErrorScreen'
import CreatePinCode from '../screens/gettingStarted/CreatePinCode'
import CreateWallet from '../screens/gettingStarted/CreateWallet'
import RegisterInfura from '../screens/gettingStarted/RegisterInfura'

import DashboardScreen from '../screens/main/DashboardScreen'

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = { isSetup: false }
  }
  componentDidMount() {
    this._loadLocalStorage()
  }
  async _loadLocalStorage() {
    try {
      const pinCodeHash = await AsyncStorage.getItem('@tEtherWallet:securityPinCodeHash')
      const keys = await AsyncStorage.getAllKeys()

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
          <Tabs key='root' hideTabBar={true}>
            <Scene key='gettingStarted' title='Wallet' component={EntryMenu} initial={true}/>
            <Scene key='createPinCode' title='Enter Pin' component={CreatePinCode} />
            <Scene key='createWallet' title='Create Wallet' component={CreateWallet} />
            <Scene key='registerInfura' title='Infura Token' component={RegisterInfura} />
          </Tabs>
          <Tabs key='main' tabBarPosition='bottom'>
            <Scene key='dashboardScreen' title='Dashboard' component={DashboardScreen} initial={true}/>
            <Scene key='errorScreen' title='Error' component={ErrorScreen}/>
          </Tabs>
        </Scene>
      </Router>
    )
  }
}
