import { generalQuery } from '../../lib/db/query';

export default (req, res) => {

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

    generalQuery((results) => {
        console.log('--------------');
        console.log(results);
        console.log('--------------');
        res.status(200).json(results);
    }, req.body.sqlQuery);
};
