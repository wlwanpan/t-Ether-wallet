import React, { Component } from 'react'
import { FlatList } from 'react-native'
import MenuButton from '../components/MenuButton'

export default class MenuButtons extends Component {
  render() {
    return(
      <FlatList
        data={this.props.buttons}
        renderItem={({item}) => <MenuButton title={item.key} onPressHandler={item.action}/>}
      />
    )
  }
}