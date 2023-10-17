const db = require('../db');

const generalQuery = (queryString) => {
    return new Promise((resolve, reject) => {
        db.all(queryString, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        });
    })
};

module.exports = {
    generalQuery,
};
