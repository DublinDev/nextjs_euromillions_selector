const db = require('../db');

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS NewDrawResult (
            id INTEGER PRIMARY KEY,
            lotteryType TEXT,
            date TEXT,
            drawNumber INTEGER,
            jackpot TEXT,
            ballMachine TEXT,
            ballSet TEXT,
            totalWinners INTEGER,
            totalTicketsSold INTEGER
        )
    `;

    db.run(query);
};

module.exports = {
    createTable
};
