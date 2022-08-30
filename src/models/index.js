const Sequelize = require('sequelize'),
mongoose = require('mongoose');
const logger = require('../utilities/winston');
const {mongo_url} = require('./config');;

const db = {};
const sequelize = new Sequelize('mydb', null, null, {
    dialect: 'mysql',
    replication: {
        read: [
            { host: 'localhost', port: 5506, username: 'mydb_slave_user', password: 'mydb_slave_pwd' },
        ],
        write: { host: 'localhost', port: 4406, username: 'mydb_user', password: 'mydb_pwd' }
    }
}
);

db.comments = sequelize.import(`${__dirname}/comments.js`);

sequelize.authenticate().then(() => {
    logger.put('[models][sequelize][connection]Connection has been established successfully.');
}).catch((error) => {
    logger.put('[models][sequelize][uncaughtException]Unable to connect to the database:', error);
});


mongoose.connect(mongo_url);

const mongodb = mongoose.connection;


mongoose.set('debug', true);


mongodb.on('error', error => logger.put('[models][mongoose][uncaughtException] message : ' + error.message));
mongodb.once('open', ()=> logger.put('[models][mongoose][connection] We are successfully connected with mongoDB '));


db.sequelize = sequelize;
db.mongodb = mongodb;

module.exports = db;

