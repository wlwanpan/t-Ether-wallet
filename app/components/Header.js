import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class Header extends Component {
  render() {
    return(
      <View style={this.props.style || styles.headerWrapper}>
        <Text style={this.props.textStyle || styles.textStyle}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  headerWrapper: {
    paddingVertical: 20
  },
  textStyle: {
    fontSize: 30,
    marginTop: 20,
    color: 'white',
    textAlign: 'center'
  }

})

Header.propTypes = {
  children: PropTypes.string
}