import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class ViewContainer extends Component {
  render() {
    return(
      <View style={this.props.style ? [this.props.style, styles.viewContainerWrapper] : styles.viewContainerWrapper}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  viewContainerWrapper: {
    flex: 1,
    backgroundColor: '#23272a'
  }

})