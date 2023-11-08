import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { DataSource } from "typeorm";
import * as path from "path"

export default async function sendPrompt(req, res) {
    // Check request method first
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.query) {
        return res.status(400).json({ error: `Property 'query' must be provided : ${req.body.query}` });
    }

    const searchQuery = req.body.query;
    const datasource = new DataSource({
        type: "sqlite",
        database: path.join(process.cwd(), "/lib/db/lottery-info.db"),
    });
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    });
    const model = new OpenAI({ openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, temperature: 0 });
    const toolkit = new SqlToolkit(db, model);
    const executor = createSqlAgent(model, toolkit);

    console.log(`Executing with input "${searchQuery}"...`);

    const result = await executor.call({ input: searchQuery });

    console.log(`Got output ${result.output}`);

    console.log(
        `Got intermediate steps ${JSON.stringify(
            result.intermediateSteps,
            null,
            2
        )}`
    );

    await datasource.destroy();
    return res.status(200).json({ result });
}
