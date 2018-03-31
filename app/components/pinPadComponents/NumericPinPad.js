import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PinButton from './PinButton'
const _ = require('underscore')

export default class NumericPinPad extends Component {
  _generateRowRange() {
    return _(_.range(...this.props.range)).map(int => {return {key: String(int)}})
  }
  render() {
    return (
      <View style={this.props.style || {}}>
        <FlatList
          numColumns={3}
          data={this._generateRowRange()}
          renderItem={({item}) => <PinButton int={item.key} pinPress={(int) => this.props.onPress(int)} />}
        />
      </View>
    )
  }
}
