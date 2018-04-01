import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class InputTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
    this._onSubmitEditingHandler = this._onSubmitEditingHandler.bind(this)
    this._onEndEditingHandler = this._onEndEditingHandler.bind(this)
    this._focusTextInput = this._focusTextInput.bind(this)
    this._onChangeTextHandler = this._onChangeTextHandler.bind(this)
  }
  _focusTextInput() {
    this.setState({ focus: true })
  }
  _onChangeTextHandler (text) {
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }
  _onSubmitEditingHandler(data) {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing(data)
    }
  }
  _onEndEditingHandler(data) {
    if (this.props.onEndEditing) {
      this.props.onEndEditing(data)
    }
  }
  _labelStyleHandler() {
    switch (this.props.labelStyle) {
      case 'default': return styles.labelDefault
      case 'negative': return styles.labelNegative
      case 'positive': return styles.labelPositive
    }
  }
  render() {
    return(
      <View style={styles.inputFieldWrapper}>
        <Text style={[styles.labelStyle, this._labelStyleHandler()]}>
          {this.props.label}
        </Text>
        <TextInput
          style={styles.inputTextStyle}
          autoFocus={this.props.autoFocus || false}
          autoCorrect={false}
          value={this.props.value || undefined}
          placeholderTextColor='rgba(255,255,255,0.6)'
          underlineColorAndroid={this.state.focus ? '#7289da' : '#99aab5'}
          placeholder={this.props.placeholder}
          onChangeText={this._onChangeTextHandler}
          onFocus={this._focusTextInput}
          onSubmitEditing={this._onSubmitEditingHandler}
          onEndEditing={this._onEndEditingHandler}
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
    fontSize: 17
  },
  labelDefault: {
    color: '#7289da'
  },
  labelNegative: {
    color: 'red'
  },
  labelPositive: {
    color: 'green'
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
  onSubmitEditing: PropTypes.func,
  onEndEditing: PropTypes.func
}