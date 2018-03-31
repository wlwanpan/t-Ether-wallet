import React, { Component } from 'react'
import { BackHandler, StyleSheet, View, Text, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ViewContainer from '../components/ViewContainer'
import MenuButtons from '../components/MenuButtons'

export default class EntryMenu extends Component {
  render() {
    return (
      <ViewContainer style={styles.menuContainer}>
        <View style={styles.menuList}>
          <MenuButtons
            buttons= {[
              {key: 'Setup Wallet', action: () => {Actions.createPinCode()}},
              {key: 'Close', action: () => {BackHandler.exitApp()}}
            ]}
          />
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({

  menuContainer: {
    justifyContent: 'flex-end'
  },
  menuList: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 30
  }

})