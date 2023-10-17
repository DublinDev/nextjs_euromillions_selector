const db = require('.');


const insert = (query, values) => {
    return new Promise((resolve, reject) => {
        db.run(query, values, function (error) {
            if (error) {
                reject(error);
            } else {
                // If you want to get the ID of the row you just inserted, you can use `this.lastID`
                resolve({ id: this.lastID });
            }
        });
    });
};

export { insert };
