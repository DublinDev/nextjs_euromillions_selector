import { insert } from '../../lib/db/insert';
import { COUNTRY_CODES } from '../../utils/constants';

export default (req, res) => {

    return new Promise((resolve, reject) => {
        const expectedValues = [
            "drawResultId",
            "country",
            "numbersMatched",
            "countrySpecificWinners",
            "prizesPerWinner",
            "totalWinners",
            "prizeFundAmount",
        ]

        if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
            throw new Error(`Property "drawResultId" must be provided and an int: ${req.body.drawResultId}`);
        }
        if (!req.body.country || !COUNTRY_CODES.includes(req.body.country)) {
            throw new Error(`Property "country" must be provided and in the provided list: ${req.body.country}`);
        }
        if (!req.body.numbersMatched) {
            throw new Error(`Property "numbersMatched" must be provided`);
        }
        if (!req.body.countrySpecificWinners) {
            throw new Error(`Property "countrySpecificWinners" must be provided: ${req.body.countrySpecificWinners}`);
        }
        //ToDo: Verify checks are in place
        if (!req.body.prizesPerWinner) {
            throw new Error(`Property "prizesPerWinner" must be provided`);
        }
        if (!req.body.totalWinners /*|| isNaN(totalWinners)*/) {
            throw new Error(`Property "totalWinners" must be provided`);
        }
        if (!req.body.prizeFundAmount/* || isNaN(prizeFundAmount)*/) {
            throw new Error(`Property "prizeFundAmount" must be provided`);
        }

        const valuesArr = expectedValues.map(key => req.body[key]);
        const insertQuery = `INSERT INTO CountryResult(drawResultId, country, numbersMatched, countrySpecificWinners, prizesPerWinner, totalWinners, prizeFundAmount)
    VALUES(?,?,?,?,?,?,?)`;

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
