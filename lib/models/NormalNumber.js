const db = require('../db');

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS NormalNumber (
            id INTEGER PRIMARY KEY,
            drawId INTEGER REFERENCES NewDrawResult(id),
            number INTEGER,
            FOREIGN KEY(drawId) REFERENCES NewDrawResult(id)
        )
    `;

    db.run(query);
};

module.exports = {
    createTable
};
