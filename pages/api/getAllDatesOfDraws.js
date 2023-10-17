import { generalQuery } from '../../lib/db/query';

export default (req, res) => {
    return new Promise((resolve, reject) => {

        if (!req.body.searchYear || isNaN(req.body.searchYear)) {
            return res.status(400).json({ error: `Property "searchYear" must be provided and an int: ${req.body.searchYear}`});
        }

        const valuesArr = [req.body.searchYear];
        const insertQuery = `SELECT date FROM NewDrawResult WHERE date LIKE '%${req.body.searchYear}%'`;

        if (req.method === 'POST') {

            generalQuery((results) => {
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
