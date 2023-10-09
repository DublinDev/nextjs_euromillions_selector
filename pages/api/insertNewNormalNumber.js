import { insert } from '../../lib/db/insert';

export default (req, res) => {
    return new Promise((resolve, reject) => {

        if (!req.body.number || !(req.body.number >= 1 && req.body.number <= 50)) {
            throw new Error(`Property "number" must be provided and between 0 and 51: ${req.body.number}`);
        }
        if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
            throw new Error(`Property "drawResultId" must be provided and an int: ${req.body.drawResultId}`);
        }

        const valuesArr = [req.body.drawResultId, req.body.number];
        const insertQuery = `INSERT INTO NormalNumber(drawResultId, number) VALUES(?,?)`;

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
