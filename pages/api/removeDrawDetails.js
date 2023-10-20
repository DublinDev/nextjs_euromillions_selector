import { removeFromDB } from '../../lib/db/delete';


export default async function deleteDraw(req, res) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { drawNumber } = req.body;

    if (!drawNumber || isNaN(drawNumber)) {
        return res.status(405).json({ error: `Property "drawNumber" must be provided and above 0: ${drawNumber}` });
    }

    // List of tables to delete the records from
    const quieries = [
        'DELETE FROM DrawDetails WHERE id = ?',
        'DELETE FROM PrizeDetails WHERE drawId = ?',
        'DELETE FROM NormalNumbers WHERE drawId = ?',
        'DELETE FROM BonusNumbers WHERE drawId = ?',
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
