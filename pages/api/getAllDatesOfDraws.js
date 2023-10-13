import { generalQuery } from '../../lib/db/query';

export default (req, res) => {

    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.searchYear || isNaN(req.body.searchYear)) {
        return res.status(400).json({error: `Property "searchYear" must be provided and an int: ${req.body.searchYear}`})
    }

    const valuesArr = [req.body.searchYear];
    const insertQuery = `SELECT date FROM NewDrawResult WHERE date LIKE '%${req.body.searchYear}%'`;

    generalQuery((results) => {
        console.log(results);
        return res.status(200).json(results);
    }, insertQuery, valuesArr);

};
