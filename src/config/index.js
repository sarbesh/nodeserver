const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    mysql_write_url: process.env.MYSQL_URL,
    mysql_write_user: process.env.MYSQL_USER,
    mysql_write_password: process.env.MYSQL_PASSWORD,
    mysql_write_port: process.env.MYSQL_WRITE_PORT,
    mysql_database: process.env.MYSQL_DB,
    mysql_read_url: process.env.MYSQL_READ_URL,
    mysql_read_user: process.env.MYSQL_READ_USER,
    mysql_read_password: process.env.MYSQL_READ_PASSWORD,
    mysql_read_port: process.env.MYSQL_READ_PORT,
}
