import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import NumericPinPad from './pinPadComponents/NumericPinPad'
import PinIndicator from './pinPadComponents/PinIndicator'
import Header from './Header'

export default class PinPad extends Component {
  render() {
    return (
      <View style={styles.pinPadWrapperView}>

        <Header style={styles.header}>{this.props.title}</Header>
        <PinIndicator
          style={styles.pinIndicatorStyle}
          maxSize={this.props.pinLimit}
          currentSize={this.props.pin.length}
        />
        <NumericPinPad
          range={[1, 10]}
          onPress={this.props.onPress}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({

  pinPadWrapperView: {
    paddingVertical: 25,
    paddingHorizontal: 10
  },
  header: {
    marginBottom: 40
  },
  pinIndicatorStyle: {
    marginHorizontal: 30,
    marginBottom: 30
  }

})