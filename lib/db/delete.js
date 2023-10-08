const db = require('.');

const removeFromDB = (callback, queryString, values) => {

    db.run(queryString, values, (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }

        callback(rows);
    });
};

module.exports = {
    removeFromDB,
};
