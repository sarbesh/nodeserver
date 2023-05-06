const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    mysql_write_url: process.env.MYSQL_WRITE_HOST,
    mysql_write_user: process.env.MYSQL_WRITE_USER,
    mysql_write_password: process.env.MYSQL_WRITE_PASSWORD,
    mysql_write_port: process.env.MYSQL_WRITE_PORT,
    mysql_database: process.env.MYSQL_DB,
    mysql_read_url: process.env.MYSQL_READ_HOST,
    mysql_read_user: process.env.MYSQL_READ_USER,
    mysql_read_password: process.env.MYSQL_READ_PASSWORD,
    mysql_read_port: process.env.MYSQL_READ_PORT,
    enable_ab: process.env.ENABLE_AB,
    server_name: process.env.SERVER_NAME,
}
