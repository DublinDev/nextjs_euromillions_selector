const SYS_SETUP_STRING = `There is a database which contains information on all the data
related to the euromillions lottery draws. I will provide you with the database schemas. 
It's important to know that DrawDetails contains the main information about the draw and 
PrizeDetails contain the information relating to how many winners there where in each country,
how many balls they matched and how much they won (along with some other information). 

The goal of the user is to get some numbers from the historical data to assit them selecting
their numbers. They will be submitting a prompt in a regular sentence and this sentence will 
need to be transformed into an SQL query that can get them back the numbers they are looking
for. Use your knowledge of the tables below to generate this query and return it to the user.

When the user refers to a "number" assume they are talking about a normal number and not a
luckystar(a.k.a. bonus) number.

If they submit prompt which is appears to be unrelated to the information available in this
db then return "This information appears to be unrelated to the euromillions". 

When asked for lucky stars you just need to search BonusNumbers table instead of NormalNumbers.

CREATE TABLE BonusNumbers(
  id INTEGER PRIMARY KEY,
  drawId INTEGER, 
  number INTEGER, - One of the bonus numbers drawn in the associated draw, ranges from 1-12
  FOREIGN KEY(drawId) REFERENCES DrawDetails(id)
);
/* Columns in BonusNumbers and 3 examples for each high cardinality column
  id: 100, 20123, 34332
  drawId: 1, 405, 2500, 
  number: 1, 5, 12
*/

CREATE TABLE NormalNumbers(
  id INTEGER PRIMARY KEY,
  drawId INTEGER,
  number INTEGER, - One of the normal numbers drawn in the associated draw, ranges from 1-50
  FOREIGN KEY(drawId) REFERENCES DrawDetails(id)
);
/* Columns in NormalNumbers and 3 examples for each high cardinality column
  id: 100, 20123, 34332
  drawId: 1, 405, 2500, 
  number: 1, 5, 12
*/

CREATE TABLE DrawDetails(
  id INTEGER PRIMARY KEY,
  lotteryType TEXT, - WIll most likely be euromillions
  date DATE, - Date of the draw in dd-mm-yyyy format
  drawNumber INTEGER, - The unique number of the draw given by the lottery provider 
  jackpot REAL, - The total jackpot of the draw, in euros
  ballMachine TEXT, - Meta data about the ball machine
  ballSet TEXT, - Meta data about the ball set used
  totalWinners INTEGER, - The total number of winners from this draw
  totalTicketsSold INTEGER - The total number of tickets sold for the draw
  outcome TEXT - The overall result of the jackpot for the draw
);
/* Columns in DrawDetails and 3 examples for each high cardinality column
 id: 1, 25, 2344
 date: 20-11-2020, 09-12-2011, 20-09-2011
 drawNumber: 5, 34, 6432
 jackpot: 100456.0, 220000000.0, 8473000.0
 totalWinners: 123, 456435, 34
 totalTicketsSold: 234,543, 654,654, 18,234,543
*/
/* Columns in DrawDetails and 3 examples for each low cardinality column
  lotteryType: euromillions, irish national lottery
  ballMachine: Machine 1, 14, 11
  ballSet: E1, 21, 3
  outcome: Jackpot WON!, Rollover!, Rolldown!
*/

CREATE TABLE PrizeDetails(
  id INTEGER PRIMARY KEY,
  drawId INTEGER,
  numbersMatched TEXT, - The amount of numbers which were matched for this prize level
  totalWinners INTEGER, - The total amount winners from all countries
  country TEXT, - The country code of where this result is for, options are [ie, fr, gb, es, pt, ch, be, at, lu]
  countrySpecificWinners INTEGER, - How many winners there were for this prize level
  prizeCurrency TEXT - The currency symbol used in this row for the values in the following fields
  prizesPerWinner REAL, - The amount each winner recieved 
  prizeFundAmount REAL, - The total amount dispersed between the winners in this country for this prize level
  FOREIGN KEY(drawId) REFERENCES DrawDetails(id)
);
/* Columns in DrawDetails and 3 examples for each high cardinality column
 id: 1, 25, 2344
  drawId: 1, 405, 2500, 
  countrySpecificWinners: 0, 65, 14,629
  prizesPerWinner: €51,792,388.00, €1,024,726.00, €113,858.00 
  totalWinners: 0, 6, 1,969
  prizeFundAmount: €0.00, €1,024,726.00, €18,888.00 
*/
/* Columns in DrawDetails and 3 examples for each low cardinality column
  country: ie, fr, gb
  numbersMatched: 5 + 2, 4, 3
  prizeCurrency: €, £ CHF
*/
`;


const QUERIES = [
  "The 5 most common numbers",
  "The 2 least common bonus numbers",
  "The 4 most common lucky stars",
  "The most common numbers from every draw on the 12th of October",
  "The most common numbers drawn from every draw on the 12th of October",
  "The most common numbers from the last 6 months",
  "The largest jackpot won in Ireland",
  "The most common numbers from all jackpot wins in France",
  "The dates of the 5 highest jackpots",
];

const connections = [
  {
    sql: `SELECT date, REPLACE(REPLACE(jackpot, '€', ''), '£', '') AS jackpot
    FROM DrawDetails
    WHERE lotteryType = 'euromillions'
    ORDER BY CAST(REPLACE(REPLACE(jackpot, '€', ''), '£', '') AS REAL) DESC
    LIMIT 5;    
    `,
    prompt: "The dates and amounts of the 5 highest jackpots"
  }
]

const FINAL_REFORMAT_OF_DATA = (originalPrompt, sqlQuery, sqlResult) => `You will now be sent a the results of the SQL Query you generated. Please use the 
information and return a JSON Object in the format 
{
    suggestedNumbers: {
        NormalNumbers: [N, N, N],
        BonusNumbers: [N,N]
    },
    originalPrompt: "",
    sqlQuery: "",
    dbQueryResult: {}
}

The original prompt is ${originalPrompt}. 
The SQL query is ${sqlQuery}.
The dbQueryResult returned is ${sqlResult}.
`;


const SYS_MSG_FINAL_REFORMAT = `
I need to pass you some objects and have them reformatted into this structure:
{
  suggestedNumbers: {
    normalNumbers: [],
    bonusNumbers: []
  }
}

There will often only be one type of number returned. You may receive additional information but you will have to extract out the numbers into this format.
If not otherwise specified assume they are normal numbers.

Additionally I will submit additional data and you need to return a whole
object in this format:
{
    suggestedNumbers: {
      normalNumbers: [],
      bonusNumbers: []
    },
    originalPrompt: "",
    sqlQuery: "",
    dbQueryResult: {} 
}
`
const COUNTRY_CODES = ["ie", "fr", "gb", "es", "pt", "ch", "be", "at", "lu"];
const LOTTERY_TYPES = ["euromillions"];
const JACKPOT_OUTCOME_OPTIONS = ["Jackpot Won!", "Rolldown!", "Rollover!"];


module.exports = {
  SYS_SETUP_STRING,
  SYS_MSG_FINAL_REFORMAT,
  COUNTRY_CODES,
  LOTTERY_TYPES,
  JACKPOT_OUTCOME_OPTIONS,
};
