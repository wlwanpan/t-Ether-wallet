import 'babel-preset-react-native-web3/globals'
import React, { PureComponent } from 'react'
import Routes from './app/router/Routes'

type Props = {}
export default class App extends PureComponent<Props> {
	constructor(props: Props) {
		super(props)
	}
	render() {
		return (
			<Routes />
		)
	}
}
