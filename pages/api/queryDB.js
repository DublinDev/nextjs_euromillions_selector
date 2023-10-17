import { generalQuery } from '../../lib/db/query';

export default async (req, res) => {

    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.sqlQuery) {
        return res.status(400).json({ error: `Property 'sqlQuery' must be provided : ${req.body.sqlQuery}` });
    }

    const disallowedSQLTerms = ["INSERT", "DELETE", "UPDATE", "ALTER", "DROP", "CREATE"];
    for (let word of req.body.sqlQuery.split(' ')) {
        if (disallowedSQLTerms.includes(word.toUpperCase())) {
            return res.status(400).json({ error: `The provided SQL query violates a safety check and is not allowed` });
        }
    }

    try {
        // Use the promise-based insert function
        const results = await generalQuery(req.body.sqlQuery);
        console.log(results);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
