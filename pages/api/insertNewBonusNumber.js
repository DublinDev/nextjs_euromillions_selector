import { insert } from '../../lib/db/insert';

export default (req, res) => {

    return new Promise((resolve, reject) => {
        if (!req.body.number || !(req.body.number >= 1 && req.body.number <= 12)) {
            throw new Error(`Property "number" must be provided and between 0 and 12: ${req.body.number}`);
        }
        if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
            throw new Error(`Property "drawResultId" must be provided and an int: ${req.body.drawResultId}`);
        }

        const valuesArr = [req.body.drawResultId, req.body.number];
        const insertQuery = `INSERT INTO BonusNumber(drawResultId, number) VALUES(?,?)`;

        if (req.method === 'POST') {

            insert((insertId) => {
                console.log(insertId);
                console.log('*********');
                res.status(200).json({id: insertId});
                resolve();
                // res.end();
            }, insertQuery, valuesArr);

        } else {
            res.status(405).end(); // Method Not Allowed
            resolve();
        }

    })
};
