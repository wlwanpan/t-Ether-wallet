module.exports = {
	networks: {
		development: {
			protocol: 'http',
			host: 'localhost',
			port: 8545,
			network_id: '*',
		},
		ropsten: {
			protocol: 'https',
			host: 'ropsten.infura.io',
			key: '',
			port: 8545,
			network_id: 3,
		},
	},
	migrations_directory: './migrations',
};
