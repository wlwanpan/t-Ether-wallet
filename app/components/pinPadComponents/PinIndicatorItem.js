import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
const _ = require('underscore')

export default class PinIndicatorItem extends Component {
  render() {
    return(
      <View style={this.props.fill ? [styles.base].concat(styles.fill) : styles.base} />
    )
  }
}

const styles = StyleSheet.create({

  base: {
    flex: 1,
    height: 15,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 3
  },
  fill: {
    backgroundColor: '#7289da',
    borderColor: '#000'
  }

})