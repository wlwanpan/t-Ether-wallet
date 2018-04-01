import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ViewContainer from '../../components/ViewContainer'
import PinPad from '../../components/PinPad'
import { default as _ } from 'underscore'

export default class CreatePinCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinTitle: 'Enter Pin',
      pinLimit: 4,
      cPin: [],
      pin: []
    }
    this._onPressHandler = this._onPressHandler.bind(this)
  }
  componentWillReceiveProps(props) {
    if (props.pin && props.cPin) {
      this.setState({
        ...this.state,
        pinTitle: props.pinTitle || 'Enter Pin',
        pin: props.pin,
        cPin: props.cPin
      })
    }
  }
  async componentDidUpdate() {
    if (this.state.pin.length < this.state.pinLimit) { return }
    if (this.state.cPin.length === 0) {
      await this._delayBy(800)
      Actions.refresh({
        pinTitle: 'Confirm Pin',
        cPin: this.state.pin,
        pin: []
      })
      return
    }

    let cPinStr = this._pinArrToStr(this.state.cPin)
    let pinStr = this._pinArrToStr(this.state.pin)
    if (cPinStr === pinStr) {
      await this._storePinCode(pinStr)
      this.setState({
        pinTitle: 'Enter Pin',
        cPin: [],
        pin: []
      })
    }
    else {
      Actions.refresh({
        pinTitle: 'Enter Pin',
        cPin: [],
        pin: []
      })
    }
  }
  _pinArrToStr(pin) {
    return _(pin).reduce((int, acc) => int + acc, '')
  }
  _delayBy(delay) {
    return new Promise(resolve => setTimeout(() => resolve()), delay)
  }
  async _storePinCode(pin) {
    try {
      await this.props.web3.aStorePinCode(pin)
      Actions.createMnemonic()
    }
    catch(err) {
      this.props.alert(err)
    }
    this.setState({
      ...this.state,
      pin: []
    })
  }
  _onPressHandler(pin) {
    this.setState({
      ...this.state,
      pin: [...this.state.pin, pin]
    })
  }
  render() {
    return(
      <ViewContainer>
        <PinPad
          title={this.state.pinTitle}
          pin={this.state.pin}
          pinLimit={this.state.pinLimit}
          onPress={this._onPressHandler}
        />
      </ViewContainer>
    )
  }
}