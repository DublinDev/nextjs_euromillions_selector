import { insert } from '../../lib/db/insert';
import { COUNTRY_CODES } from '../../utils/constants';

export default async (req, res) => {

    const expectedValues = [
        "drawId",
        "numbersMatched",
        "totalWinners",
        "country",
        "countrySpecificWinners",
        "prizeCurrency",
        "prizeAmountPerWinner",
        "prizeFundAmount",
    ]
    let errors = [];

    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.drawId || isNaN(req.body.drawId)) {
        errors.push(`Property 'drawId' must be provided and an int: ${req.body.drawId}`);
    }
    if (!req.body.country || !COUNTRY_CODES.includes(req.body.country)) {
        errors.push(`Property 'country' must be provided and in the provided list: ${req.body.country}`);
    }
    if (!req.body.numbersMatched) {
        errors.push(`Property 'numbersMatched' must be provided: ${req.body.numbersMatched}`);
    }
    if (!req.body.countrySpecificWinners) {
        errors.push(`Property 'countrySpecificWinners' must be provided: ${req.body.countrySpecificWinners}`);
    }
    //ToDo: Verify checks are in place
    if (!req.body.prizeAmountPerWinner) {
        errors.push(`Property 'prizeAmountPerWinner' must be provided: ${req.body.prizeAmountPerWinner}`);
    }
    if (!req.body.totalWinners /*|| isNaN(totalWinners)*/) {
        errors.push(`Property 'totalWinners' must be provided: ${req.body.totalWinners}`);
    }
    if (!req.body.prizeFundAmount/* || isNaN(prizeFundAmount)*/) {
        errors.push(`Property 'prizeFundAmount' must be provided: ${req.body.prizeFundAmount}`);
    }

    if (!req.body.prizeCurrency/* || isNaN(prizeFundAmount)*/) {
        errors.push(`Property 'prizeCurrency' must be provided: ${req.body.prizeCurrency}`);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const valuesArr = expectedValues.map(key => req.body[key]);
    const insertQuery = `INSERT INTO PrizeDetails(drawId, numbersMatched, totalWinners, country, countrySpecificWinners, prizeCurrency, prizeAmountPerWinner, prizeFundAmount)
    VALUES(?,?,?,?,?,?,?,?)`;

    try {
        // Use the promise-based insert function
        const results = await insert(insertQuery, valuesArr);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
