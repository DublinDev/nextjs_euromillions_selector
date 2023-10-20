import { insert } from '../../lib/db/insert';

export default async (req, res) => {

    let errors = [];

    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.number || !(req.body.number >= 1 && req.body.number <= 12)) {
        errors.push(`Property 'number' must be provided and between 0 and 12: ${req.body.number}`);
    }
    if (!req.body.drawId || isNaN(req.body.drawId)) {
        errors.push(`Property 'drawId' must be provided and an int: ${req.body.drawId}`);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const valuesArr = [req.body.drawId, req.body.number];
    const insertQuery = `INSERT INTO BonusNumbers(drawId, number) VALUES(?,?)`;

    try {
        // Use the promise-based insert function
        const results = await insert(insertQuery, valuesArr);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }

};
