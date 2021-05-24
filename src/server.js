const chalk = require('chalk');
const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: __dirname + '/../.env' });
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { ENVIRONMENT, PORT } = require('./constants');

const initaliazeServer = async () => {
    console.log(chalk.grey('starting server...'));

    await connectDB();

    const app = express();

    // Dev Logging middleware
    if (ENVIRONMENT === 'development') {
        app.use(morgan('dev'));
    }

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });
    });

    app.get('/sample', (req, res) => {
        res.json({
            message: 'sample',
        });
    });

    const server = app.listen(PORT, () => {
        console.log(chalk.blue(`server running in ${ENVIRONMENT} mode on port: ${PORT}`));
        console.log(chalk.blueBright(`local url: http://localhost:${PORT}`));
    });

    return server;
}

module.exports = {
    initaliazeServer,
};