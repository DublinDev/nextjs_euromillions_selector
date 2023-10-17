import { generalQuery } from '../../lib/db/query';

export default async (req, res) => {

    if (!req.body.searchYear || isNaN(req.body.searchYear)) {
        return res.status(400).json({ error: `Property "searchYear" must be provided and an int: ${req.body.searchYear}` });
    }

    const insertQuery = `SELECT date FROM NewDrawResult WHERE date LIKE '%${req.body.searchYear}%'`;

    if (req.method === 'POST') {

        try {
            // Use the promise-based insert function
            const results = await generalQuery(insertQuery);
            console.log(results);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ error });
        }

        // generalQuery((results) => {
        //     console.log(results);
        //     res.status(200).json(results);
        //     resolve();
        // }, insertQuery);

    } else {
        return res.status(405).end(); // Method Not Allowed

    }
};
