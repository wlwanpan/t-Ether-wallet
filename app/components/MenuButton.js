import React, { Component } from 'react'
import { StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class MenuButton extends Component {
  onPressHandler() {
    if (typeof(this.props.onPressHandler) === 'function') {
      this.props.onPressHandler()
    }
    else {
      Actions.errorScreen()
    }
  }
  render() {
    return (
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => this.onPressHandler()}>
        <Text style={styles.buttonText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  buttonWrapper: {
    width: 380,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#7289da',
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  }

})