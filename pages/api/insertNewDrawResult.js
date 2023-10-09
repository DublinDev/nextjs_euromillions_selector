import { insert } from '../../lib/db/insert';
import { LOTTERY_TYPES } from '../../utils/constants';

export default (req, res) => {

    return new Promise((resolve, reject) => {

        const expectedValues = [
            "lotteryType",
            "date",
            "drawNumber",
            "jackpot",
            "ballMachine",
            "ballSet",
            "totalWinners",
            "totalTicketsSold"
        ]

        if (!req.body.lotteryType || !LOTTERY_TYPES.includes(req.body.lotteryType)) {
            throw new Error(`Property "lotteryType" must be provided and of a set type: ${req.body.lotteryType}`);
        }
        if (!req.body.date) {
            throw new Error(`Property "date" must be provided and in the provided list`);
        }
        if (!req.body.drawNumber || isNaN(req.body.drawNumber)) {
            throw new Error(`Property "drawNumber" must be provided: ${req.body.drawNumber}`);
        }
        if (!req.body.jackpot) {
            throw new Error(`Property "jackpot" must be provided`);
        }
        if (!req.body.ballMachine) {
            throw new Error(`Property "ballMachine" must be provided`);
        }
        if (!req.body.ballSet) {
            throw new Error(`Property "ballSet" must be provided`);
        }
        if (!req.body.totalWinners) {
            throw new Error(`Property "totalWinners" must be provided`);
        }
        if (!req.body.totalTicketsSold) {
            throw new Error(`Property "totalTicketsSold" must be provided`);
        }

        const valuesArr = expectedValues.map(key => {
            if (!req.body.hasOwnProperty(key)) {
                throw new Error(`Missing required property [${key}] while attempting add to NewDrawResult`)
            }
            return req.body[key];
        });

        const insertQuery = `INSERT INTO NewDrawResult(lotteryType,date,drawNumber,jackpot,ballMachine,ballSet,totalWinners, totalTicketsSold)
    VALUES(?,?,?,?,?,?,?,?)`;

        if (req.method === 'POST') {

            insert((results) => {
                console.log(results);
                res.status(200).json(results);
                resolve();
            }, insertQuery, valuesArr);

        } else {
            res.status(405).end(); // Method Not Allowed
            resolve();
        }
    });
};
