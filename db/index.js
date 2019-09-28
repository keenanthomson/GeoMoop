const mysql = require('mysql');
const Promise = require('bluebird');
const database = 'geomoop';

const connection = mysql.createConnection({
  user: 'root',
  password: ''
});

const db = Promise.promisifyAll(connection);

db.queryAsync(`
CREATE TABLE IF NOT EXISTS checkout (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  latitude INT,
  longitude INT,
  name VARCHAR(64),
  zindex INT
);`)
.error(err => {
  console.log(err);
});

const insertRecord = (record) => {
  db.queryAsync(`INSERT INTO stateRecords SET ?`, record, (err) => {
    if (err) {
      console.log(err);
    }
    cb();
  });
};

module.exports.insertRecord = insertRecord;