/* @flow */

import React, { Component } from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Block from './Block';

import PTRView from 'react-native-pull-to-refresh';

const styles = StyleSheet.create({
	box: { flex: 1 },
	spacer: { flex: 1 },
});


export default class Main extends Component<Props, State> {
	state = {
		block: null,
		isLoading: true,
	};
	componentDidMount() {
		const { web3 } = this.props;
		web3.eth.getBlock('latest', (err, block) => {
			this.setState({
				block,
				isLoading: false,
			});
		});
	}
	reload = (): Promise<*> => {
		return new Promise((resolve: Function) => {
			const { web3 } = this.props;
			web3.eth.getBlock('latest', (err, block) => {
				this.setState({
					block,
					isLoading: false,
				});
				resolve();
			});
		});
	};
	render() {
		return (
			<PTRView onRefresh={this.reload}>
				<View style={styles.box}>
					{this.state.isLoading && (
						<ActivityIndicator size="large" color="#000000" />
					)}
					{!this.state.isLoading && <Block block={this.state.block} />}
					<View style={styles.spacer} />
				</View>
			</PTRView>
		);
	}
}
