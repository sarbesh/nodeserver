const Sequelize = require('sequelize'),
mongoose = require('mongoose');
const logger = require('../utilities/winston');
const config = require('../config');

const db = {};
try {
    const sequelize = new Sequelize('mydb', null, null, {
        dialect: 'mysql',
        replication: {
            read: [
                { host: config.mysql_read_url, port: config.mysql_read_port, username: config.mysql_read_user, password:  config.mysql_read_password },
            ],
            write: { host: config.mysql_write_url, port: config.mysql_write_port, username: config.mysql_write_user, password:  config.mysql_write_password }
        }
    }
    );
    
    db.comments = sequelize.define(`${__dirname}/comments.js`);
    // db.comments = require(path.join(__dirname, 'comments.js'))(sequelize, Sequelize.DataTypes);
    
    sequelize.authenticate().then(() => {
        logger.put('[models][sequelize][connection]Connection has been established successfully.');
    }).catch((error) => {
        logger.put('[models][sequelize][uncaughtException]Unable to connect to the database:', error);
    });

    db.sequelize = sequelize;
} catch (error) {
    console.log("sql error");
}

// console.log("MONGO_URL", process.env.MONGO_URL);
// console.log("mongo_url", process.env.mongo_url);

mongoose.connect(config.mongo_url).then(x => {
    const mongodb = x.connection;
    x.connection.set('debug', true);

    mongodb.on('error', error => logger.put('[models][mongoose][uncaughtException] message : ' + error.message));
    mongodb.once('open', ()=> logger.put('[models][mongoose][connection] We are successfully connected with mongoDB '));

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => logger.put('Mongoose default connection disconnected'));

    db.mongodb = mongodb;

}).catch((error) => console.log("Error:", error));

module.exports = db;

