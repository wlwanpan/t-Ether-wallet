import 'babel-preset-react-native-web3/globals'
import React, { PureComponent } from 'react'
import Routes from './app/router/Routes'

// Web3 and truffle import
// import Web3 from 'web3'
// import truffleConfig from './truffle'
// const network = truffleConfig.networks.ropsten
// const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`

type Props = {}
export default class App extends PureComponent<Props> {
	constructor(props: Props) {
		super(props)
		// const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS)
		// this.web3 = new Web3(web3Provider)
	}
	render() {
		return (
			<Routes />
		)
	}
}
