import { insert } from '../../lib/db/insert';

export default async (req, res) => {
    // List of errors
    const errors = [];

    // Check drawResultId
    if (!req.body.drawResultId || isNaN(req.body.drawResultId)) {
        errors.push(`Property 'drawResultId' must be provided and an int: ${req.body.drawResultId}`);
    }

    // Check number
    if (!req.body.number || isNaN(req.body.number) || (req.body.number <= 0 || req.body.number > 50)) {
        errors.push(`Property 'number' must be provided and between 1 and 50: ${req.body.number}`);
    }

    // If there are errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Construct the query and values for the insert operation
    const valuesArr = [req.body.drawResultId, req.body.number];
    const insertQuery = `INSERT INTO NormalNumber(drawResultId, number) VALUES(?,?)`;

    if (req.method === 'POST') {
        try {
            // Use the promise-based insert function
            const results = await insert(insertQuery, valuesArr);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
};
