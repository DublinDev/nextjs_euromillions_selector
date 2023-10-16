import { insert } from '../../lib/db/insert';

export default (req, res) => {

    return new Promise((resolve, reject) => {

        let errors = [];
        console.log('In BonusNumber');

        // Check request method first
        if (req.method !== 'POST') {
            res.status(405).end(); // Method Not Allowed
            resolve();
        }

        if (!req.body.number || !(req.body.number >= 1 && req.body.number <= 12)) {
            errors.push(`Property 'number' must be provided and between 0 and 12: ${req.body.number}`);
        }
        if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
            errors.push(`Property 'drawResultId' must be provided and an int: ${req.body.drawResultId}`);
        }

        if (errors.length > 0) {
            res.status(400).json({ errors });
            resolve();
        }

        const valuesArr = [req.body.drawResultId, req.body.number];
        const insertQuery = `INSERT INTO BonusNumber(drawResultId, number) VALUES(?,?)`;

        insert((insertId) => {
            console.log(insertId);
            console.log('*********');
            res.status(200).json({ id: insertId });
            resolve();
        }, insertQuery, valuesArr);
    })

};
