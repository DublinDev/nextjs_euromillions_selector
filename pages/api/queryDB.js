import { generalQuery } from '../../lib/db/query';

export default (req, res) => {
    if (req.method === 'POST') {
        
        generalQuery((results) => {
            console.log(results);
            res.status(200).json(results);
        }, req.body.sqlQuery);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};