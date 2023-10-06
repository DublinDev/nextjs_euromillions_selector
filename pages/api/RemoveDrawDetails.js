import { insert } from '../../lib/db/insert';

export default (req, res) => {

    if (!req.body.number || !(req.body.number > 0 && req.body.number < 13)) {
        throw new Error(`Property "number" must be provided and above 0`);
    }
    if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
        throw new Error(`Property "drawResultId" must be provided and an int`);
    }

    const valuesArr = [req.body.number, req.body.drawResultId];
    const insertQuery = `INSERT INTO NormalNumber(drawResultId, number) VALUES(?,?)`;

    if (req.method === 'POST') {

        insert((results) => {
            console.log(results);
            res.status(200).json(results);
        }, insertQuery, valuesArr);

    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
