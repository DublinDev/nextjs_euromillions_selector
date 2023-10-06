const db = require('.');

const insert = (callback, queryString, values) => {

    db.run(queryString, values, (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }

        callback(rows);
    });
};

module.exports = {
    insert,
};
