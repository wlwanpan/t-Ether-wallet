import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'
import NativeWeb3 from '../lib/NativeWeb3'
import { Constants } from 'expo'

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
    this.alert = this.alert.bind(this)
  }
  async componentDidMount() {
    try {
      const storedPinHash = await this.state.web3.aLoadPinHash()
      console.log(storedPinHash)
      if (false) {
        Actions.main()
      } else {
        Actions.root()
      }
    }
    catch(err) {
      this.alert(err)
    }
  }
  alert(err) {
    Alert.alert(
      'Oupsy Error', err,
      [{text: 'Cancel', onPress: () => console.log('cancel dialog'), style: 'cancel'},],
      { cancelable: false }
    )
  }
  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: '#23272a', marginTop: Constants.statusBarHeight }}
        titleStyle={{ color: '#7289da' }}
        navBarButtonColor='white'
        swipeEnabled={true}
        >
        <Scene web3={this.state.web3} alert={this.alert}>
          <Tabs key='root' hideTabBar={true}>
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