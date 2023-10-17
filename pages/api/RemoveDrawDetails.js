import { removeFromDB } from '../../lib/db/delete';


export default async function deleteDraw(req, res) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!req.body.drawNumber || isNaN(req.body.drawNumber)) {
        throw new Error(`Property "drawNumber" must be provided and above 0`);
    }

    // Extract the draw number from the request body
    const { drawNumber } = req.body;

    if (!drawNumber) {
        return res.status(400).json({ error: 'Draw number is required' });
    }

    // List of tables to delete the records from
    const quieries = [
        'DELETE FROM NewDrawResult WHERE id = ?',
        'DELETE FROM CountryResult WHERE drawResultId = ?',
        'DELETE FROM NormalNumber WHERE drawResultId = ?',
        'DELETE FROM BonusNumber WHERE drawResultId = ?',
    ];

    try {
        for (let queryString of quieries) {
            const values = [drawNumber];

            const response = await removeFromDB(queryString, values);
            console.log(response);
        }

        // Send a success response after all delete operations are successful
        return res.status(200).json({ message: 'Records deleted successfully' });
    } catch (error) {
        console.error('Error deleting records:', error);
        return res.status(500).json({ error: 'Failed to delete records' });
    }
}
