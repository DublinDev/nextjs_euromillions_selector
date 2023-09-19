import openai from '../../utils/openai';
import { SYS_MSG_FINAL_REFORMAT } from '../../utils/constants';

export default async function sendFinalPromptToFormat(req, res) {

    if (!req) {
        // req = {
        //     prompt: 'What are the 5 most frenquently drawn numbers?'
        // };
    }

    const obj = {
        originalPrompt: req.body.query,
        sqlQuery: req.body.sqlQuery,
        dbQueryResult: req.body.sqlResult
    }

    console.log(obj);
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system', content: SYS_MSG_FINAL_REFORMAT,
            },
            {
                role: 'user', content: JSON.stringify(obj)
            }
        ],
        model: 'gpt-3.5-turbo',
    });

    res.status(200).json(JSON.parse(completion.choices[0].message.content));
}