import React, { Component } from 'react'
import { BackHandler, StyleSheet, View, Text, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ViewContainer from '../components/ViewContainer'
import MenuButton from '../components/MenuButton'

export default class EntryMenu extends Component {
  render() {
    return (
      <ViewContainer style={styles.menuContainer}>
        <View style={styles.menuList}>
          <FlatList
            data={[
              {key: 'Setup Wallet', action: () => {Actions.createPinCode()}},
              {key: 'Close', action: () => {BackHandler.exitApp()}}
            ]}
            renderItem={({item}) => <MenuButton title={item.key} onPressHandler={item.action}/>}
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