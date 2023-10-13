import { insert } from '../../lib/db/insert';
import { LOTTERY_TYPES, JACKPOT_OUTCOME_OPTIONS } from '../../utils/constants';

export default (req, res) => {


    const expectedValues = [
        "lotteryType",
        "date",
        "drawNumber",
        "jackpot",
        "ballMachine",
        "ballSet",
        "totalWinners",
        "totalTicketsSold",
        "outcome",
    ]

    let errors = [];

    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.drawNumber || isNaN(req.body.drawNumber)) {
        errors.push(`Property 'drawNumber' must be provided and an int: ${req.body.drawNumber}`);
    }
    if (!req.body.lotteryType || !LOTTERY_TYPES.includes(req.body.lotteryType)) {
        errors.push(`Property 'lotteryType' must be provided and of a set type: ${req.body.lotteryType}`);
    }
    if (!req.body.date) {
        errors.push(`Property 'date' must be provided and in the provided list`);
    }
    if (!req.body.jackpot) {
        errors.push(`Property 'jackpot' must be provided`);
    }
    if (!req.body.ballMachine) {
        errors.push(`Property 'ballMachine' must be provided`);
    }
    if (!req.body.ballSet) {
        errors.push(`Property 'ballSet' must be provided`);
    }
    if (!req.body.totalWinners) {
        errors.push(`Property 'totalWinners' must be provided`);
    }
    if (!req.body.totalTicketsSold) {
        errors.push(`Property 'totalTicketsSold' must be provided`);
    }
    if (!req.body.outcome || !JACKPOT_OUTCOME_OPTIONS.includes(req.body.outcome)) {
        errors.push(`Property 'outcome' must one of the expected values: ${req.body.outcome}`);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const valuesArr = expectedValues.map(key => {
        if (!req.body.hasOwnProperty(key)) {
            throw new Error(`Missing required property [${key}] while attempting add to NewDrawResult`)
        }
        return req.body[key];
    });

    const insertQuery = `INSERT INTO NewDrawResult(lotteryType,date,drawNumber,jackpot,ballMachine,ballSet,totalWinners,totalTicketsSold,outcome)
    VALUES(?,?,?,?,?,?,?,?,?)`;

    insert((results) => {
        console.log(results);
        return res.status(200).json(results);
    }, insertQuery, valuesArr);

};
