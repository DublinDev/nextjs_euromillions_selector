const db = require('.');

const removeFromDB = (queryString, values) => {

    return new Promise((resolve, reject) => {
        db.run(queryString, values, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(rows);
        });
    })
};

module.exports = {
    removeFromDB,
};

