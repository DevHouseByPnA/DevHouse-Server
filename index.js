const chalk = require('chalk');
const { initaliazeServer } = require('./src/server');

const main = async () => {
    const server = await initaliazeServer();

    process.on('unhandledRejection', (/** @type {Error} */ err, _promise) => {
        console.log(chalk.red(`Error: ${err.message}`));
        server.close(() => process.exit(1));
    });
};

// start server here!
main();
