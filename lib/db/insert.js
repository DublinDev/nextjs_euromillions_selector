const db = require('.');

const insert = (callback, queryString, values) => {
    db.run(queryString, values, function(err) {  // Use the function keyword to access 'this'
        if (err) {
            console.log(err);
            throw err;
        }
        callback(this.lastID);  // Pass the lastID to the callback
    });
};

module.exports = {
    insert,
};
