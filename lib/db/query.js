const db = require('../db');

const generalQuery = (callback, queryString) => {
    // console.log(queryString);
    
    db.all(queryString, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }

        callback(rows);
    });
};

module.exports = {
    generalQuery,
};
