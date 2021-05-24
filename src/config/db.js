const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const uri = `${process.env.MONGODB_URI}`;
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(chalk.green(`MongoDB connected: ${conn.connection.host}`));
    } catch (error) {
        console.log(chalk.red(`Error connecting to MongoDB: ${error.message}`));
    }
};

const gracefullyCloseDBConnection = () => {
    mongoose.connection.close(() => {
        console.log(chalk.black.bgYellow(`Closing mongoose connection...`));
        process.exit(0);
    });
};

module.exports = {
    connectDB,
    gracefullyCloseDBConnection,
};