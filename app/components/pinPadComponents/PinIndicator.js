import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PinIndicatorItem from './PinIndicatorItem'
const _ = require('underscore')

export default class PinIndicator extends Component {
  _generateIndicatorRange() {
    return _(_.range(this.props.maxSize)).map(int => {return {key: int}})
  }
  _fillIndicatorItem(int) {
    return int < this.props.currentSize
  }
  render() {
    return (
      <View style={this.props.style || {}}>
        <FlatList
          numColumns={this.props.maxSize}
          data={this._generateIndicatorRange()}
          renderItem={({item}) => <PinIndicatorItem fill={this._fillIndicatorItem(item.key)}/>}
        />
      </View>
    )
  }
}
