require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		},
		migrations: {
			directory: 'migrations'
		},
		debug: true
	},

	production: {
		client: 'pg',
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		},
		migrations: {
			directory: 'migrations'
		}
	},

	test: {
		client: 'mysql',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: 'migrations'
		}
	}
};
