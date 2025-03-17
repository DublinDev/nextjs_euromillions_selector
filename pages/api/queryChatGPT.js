import openai from '../../utils/openai';
import { SYS_SETUP_STRING } from '../../utils/constants';

export default async function sendPrompt(req, res) {
    const initialSystemMsg = SYS_SETUP_STRING;

    if (!req) {
        req = {
            prompt: 'What are the 5 most frenquently drawn numbers?'
        };
    }

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system', content: initialSystemMsg,
            },
            {
                role: 'user', content: req.body.query,
            }
        ],
        model: 'gpt-3.5-turbo-instruct',
    });

    res.status(200).json(completion.choices);
}
