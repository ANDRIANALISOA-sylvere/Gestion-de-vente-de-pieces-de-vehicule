const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_vente'
});

function query(sql, params, callback) {
  connection.query(sql, params, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

module.exports = { query };