const db = require('../db');

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS CountryResult (
            id INTEGER PRIMARY KEY,
            drawId INTEGER REFERENCES NewDrawResult(id),
            country TEXT,
            numbersMatched TEXT,
            countrySpecificWinners INTEGER,
            prizesPerWinner TEXT,
            totalWinners INTEGER,
            prizeFundAmount TEXT,
            FOREIGN KEY(drawId) REFERENCES NewDrawResult(id)
        )
    `;

    db.run(query);
};

module.exports = {
    createTable
};
