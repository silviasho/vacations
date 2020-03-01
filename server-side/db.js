const mysql = require('mysql2');

const { HOST, DB_PORT, USER, DATA_BASE_SCEME } = process.env;

const pool = mysql.createPool({
    host: HOST,
    port: DB_PORT,
    user: USER,
    database: DATA_BASE_SCEME,
    waitForConnectios: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool.promise();