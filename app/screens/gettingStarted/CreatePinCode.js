import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import ViewContainer from '../../components/ViewContainer'
import PinPad from '../../components/PinPad'

export default class CreatePinCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinTitle: 'Enter Pin',
      pinLimit: 4,
      pin: undefined
    }
    this._onEnterHandler = this._onEnterHandler.bind(this)
  }
  async storePinCode(pin) {
    try {
      await this.props.web3.aStorePinCode(pin)
      Actions.createMnemonic()
    }
    catch(err) {
      this.props.alert(err)
    }
    this.setState({
      ...this.state,
      pin: undefined
    })
  }
  _onEnterHandler(pin) {
    if (!this.state.pin && typeof(pin) === 'string') {
      this.setState({
        ...this.state,
        pin,
        pinTitle: 'Confirm Pin'
      })
      return
    }
    if (this.state.pin != pin) {
      this.setState({
        ...this.state,
        pin: undefined,
        pinTitle: 'Enter Pin'
      })
      return
    }
    this.storePinCode(pin)
  }
  render() {
    return(
      <ViewContainer>
        <PinPad
          title={this.state.pinTitle}
          pinLimit={this.state.pinLimit}
          onEnter={this._onEnterHandler}
        />
      </ViewContainer>
    )
  }
}