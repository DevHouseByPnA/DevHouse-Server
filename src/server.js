const chalk = require('chalk');
const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: __dirname + '/../.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { ENVIRONMENT, PORT } = require('./constants');
const { userRoute } = require('./routes/user.route');
const { projectRoute } = require('./routes/project.route');
const { workspaceRoute } = require('./routes/workspace.route');

const initaliazeServer = async () => {
    console.log(chalk.grey('starting server...'));

    await connectDB();

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '1mb' }));
    app.use(cors());

    // Dev Logging middleware
    if (ENVIRONMENT === 'development') {
        app.use(morgan('dev'));
    }

    app.get('/', (_req, res) => {
        return res.json({
            message: 'Welcome to DevHouse!',
        });
    });

    app.use('/users', userRoute);
    app.use('/projects', projectRoute);
    app.use('/workspaces', workspaceRoute);

    const server = app.listen(PORT, () => {
        console.log(
            chalk.blue(`server running in ${ENVIRONMENT} mode on port: ${PORT}`)
        );
        console.log(chalk.blueBright(`local url: http://localhost:${PORT}`));
    });

    return server;
};

module.exports = {
    initaliazeServer,
};
