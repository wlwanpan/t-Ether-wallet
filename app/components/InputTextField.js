import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class InputTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
    this.onSubmitEditingHandler = this.onSubmitEditingHandler.bind(this)
  }
  onSubmitEditingHandler() {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
  render() {
    return(
      <View style={styles.inputFieldWrapper}>
        <Text style={styles.labelStyle}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.inputTextStyle}
          autoFocus={this.props.autoFocus || false}
          autoCorrect={false}
          value={this.props.value || ''}
          onFocus={() => this.setState({ focus: true })}
          placeholderTextColor='rgba(255,255,255,0.6)'
          underlineColorAndroid={this.state.focus ? '#7289da' : '#99aab5'}
          placeholder={this.props.placeholder}
          onChangeText={(text) => this.props.onChangeText(text)}
          onSubmitEditing={this.onSubmitEditingHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  inputFieldWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 15
  },
  labelStyle: {
    opacity: 0.9,
    fontSize: 17,
    color: '#7289da'
  },
  inputTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 20
  }

})

InputTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  textRange: PropTypes.array,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func
}