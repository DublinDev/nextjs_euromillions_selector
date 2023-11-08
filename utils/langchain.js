// import { OpenAI } from "langchain/llms/openai";
// import { SqlDatabase } from "langchain/sql_db";
// import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
// import { DataSource } from "typeorm";


// export const runLangchain = async (searchQuery) => {
//     const datasource = new DataSource({
//         type: "sqlite",
//         database: "lottery-info.db",
//     });
//     const db = await SqlDatabase.fromDataSourceParams({
//         appDataSource: datasource,
//     });
//     const model = new OpenAI({ temperature: 0 });
//     const toolkit = new SqlToolkit(db, model);
//     const executor = createSqlAgent(model, toolkit);

//     console.log(`Executing with input "${searchQuery}"...`);

//     const result = await executor.call({ searchQuery });

//     console.log(`Got output ${result.output}`);

//     console.log(
//         `Got intermediate steps ${JSON.stringify(
//             result.intermediateSteps,
//             null,
//             2
//         )}`
//     );

//     await datasource.destroy();
//     return result.intermediateSteps;
// }


// // SELECT number, COUNT(*) as count
// FROM NormalNumbers
// WHERE drawId IN (
//     SELECT id 
//     FROM DrawDetails
//     WHERE substr(date, 7, 4) || '-' || substr(date, 4, 2) || '-' || substr(date, 1, 2) >= '2016-09-01'
// )
// GROUP BY number
// ORDER BY count DESC
// LIMIT 5;

// SELECT number, COUNT(*) as count
// FROM NormalNumbers
// WHERE drawId IN (
//     SELECT id 
//     FROM DrawDetails
//     WHERE date(date) >= date('2016-09-01')
// )
// GROUP BY number
// ORDER BY count DESC
// LIMIT 5;