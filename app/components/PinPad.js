import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import NumericPinPad from './pinPadComponents/NumericPinPad'
import PinIndicator from './pinPadComponents/PinIndicator'
import Header from './Header'
const _ = require('underscore')

export default class PinPad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pin: []
    }
    this._pinPressHandler = this._pinPressHandler.bind(this)
  }
  componentDidUpdate() {
    if (this.state.pin.length < this.props.pinLimit) { return }
    if (typeof(this.props.onEnter) === 'function') {
      let pin = _(this.state.pin).reduce((int, acc) => {return int + acc}, '')
      this.props.onEnter(pin)
      this.setState({pin: []})
    }
  }
  _pinPressHandler(int) {
    this.setState({ pin: this.state.pin.concat(int) })
  }
  render() {
    return (
      <View style={styles.pinPadWrapperView}>

        <Header style={styles.header}>{this.props.title}</Header>
        <PinIndicator
          style={styles.pinIndicatorStyle}
          maxSize={this.props.pinLimit}
          currentSize={this.state.pin.length}
        />
        <NumericPinPad
          range={[1, 10]}
          onPress={this._pinPressHandler}
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