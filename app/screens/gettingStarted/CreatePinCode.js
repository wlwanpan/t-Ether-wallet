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
    this.onEnterHandler = this.onEnterHandler.bind(this)
  }
  async storePinCode(pin) {
    try {
      await this.props.web3.aStorePinCode(pin)
      Actions.createMnemonic()
    }
    catch(err) {
      console.log(err)
    }
    this.setState({ pin: undefined })
  }
  onEnterHandler(pin) {
    if (!this.state.pin && typeof(pin) === 'string') {
      this.setState({pin, pinTitle: 'Confirm Pin'})
      return
    }
    if (this.state.pin != pin) {
      this.setState({pin: undefined, pinTitle: 'Enter Pin'})
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
          onEnter={this.onEnterHandler}
        />
      </ViewContainer>
    )
  }
}