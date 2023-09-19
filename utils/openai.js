import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: 'Say this is a test' }],
//         model: 'gpt-3.5-turbo',
//     });

//     console.log(completion.choices);
// }

// main();

export default openai;