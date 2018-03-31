import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class PinButton extends Component {
  _onPressHandler(e) {
    if (typeof(this.props.pinPress) === 'function') {
      this.props.pinPress(this.props.int)
    }
  }
  render() {
    return (
      <TouchableOpacity style={styles.pinButton} onPress={(int) => this._onPressHandler()}>
        <Text style={styles.pinText}>{this.props.int}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  pinButton: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#99aab5',
    borderBottomWidth: 1,
  },
  pinText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  }

})