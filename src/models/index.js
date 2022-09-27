const Sequelize = require('sequelize'),
mongoose = require('mongoose');
const logger = require('../utilities/winston');
const config = require('./config');;

const db = {};
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

db.comments = sequelize.import(`${__dirname}/comments.js`);

sequelize.authenticate().then(() => {
    logger.put('[models][sequelize][connection]Connection has been established successfully.');
}).catch((error) => {
    logger.put('[models][sequelize][uncaughtException]Unable to connect to the database:', error);
});


mongoose.connect(config.mongo_url);

const mongodb = mongoose.connection;


mongoose.set('debug', true);


mongodb.on('error', error => logger.put('[models][mongoose][uncaughtException] message : ' + error.message));
mongodb.once('open', ()=> logger.put('[models][mongoose][connection] We are successfully connected with mongoDB '));


db.sequelize = sequelize;
db.mongodb = mongodb;

module.exports = db;

