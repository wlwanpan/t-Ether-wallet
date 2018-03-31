import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'

// To Change Implementation to animation
export default class EscapeViewContainer extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={this.props.style ? [this.props.style, styles.viewWrapper] : styles.viewWrapper}
        contentContainerStyle={styles.contentStyle}
        behavior={this.props.behavior || 'position'}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({

  viewWrapper: {
    flex: 1,
    backgroundColor: '#23272a'
  },
  contentStyle: {
    paddingVertical: 0,
    marginVertical: 0
  }

})