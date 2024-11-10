const mysql = require('mysql');
const config = require('./config.json');
const host = config.mysql.host;
const user = config.mysql.user;
const password = config.mysql.password;
const database = config.mysql.discord_bot;
const insecureAuth = config.mysql.insecureAuth;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    password: password,
    database: database,
    insecureAuth: insecureAuth, 
});

module.exports = {
    query(sql, args) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, args, (err, rows) => {
                    connection.release();
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
            });
        });
    },
};
