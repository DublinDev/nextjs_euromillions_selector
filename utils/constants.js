const SYS_SETUP_STRING = `There is a database which contains information on all the data
related to the euromillions lottery draws. I will provide you with the database schemas. 
It's important to know that newDrawResult contains the main information about the draw and 
CountryResult contain the information relating to how many winners there where in each country,
how many balls they matched and how much they won (along with some other information). 

The goal of the user is to get some numbers from the historical data to assit them selecting
their numbers. They will be submitting a prompt in a regular sentence and this sentence will 
need to be transformed into an SQL query that can get them back the numbers they are looking
for. Use your knowledge of the tables below to generate this query and return it to the user.

When the user refers to a "number" assume they are talking about a normal number and not a
luckystar(a.k.a. bonus) number.

If they submit prompt which is appears to be unrelated to the information available in this
db then return "This information appears to be unrelated to the euromillions". 

For the country field in CountryResult the available options are 
[ie, fr, gb, es, pt, ch, be, at, lu]. 

drawResultId is a foreign key and references drawResultId.
When asked for lucky stars you just need to search BonusNumber table instead of NormalNumber.

NewDrawResult
id  lotteryType   date        drawNumber  jackpot      ballMachine  ballSet  totalWinners  totalTicketsSold
--  ------------  ----------  ----------  -----------  -----------  -------  ------------  ----------------
1   euromillions  30-12-2011  446         €51,792,388  Machine 1    E1       2,823,614     42,696,916      

CountryResult
id  drawResultId  country  numbersMatched  countrySpecificWinners  prizesPerWinner  totalWinners  prizeFundAmount
--  ------------  -------  --------------  ----------------------  ---------------  ------------  ---------------
2   1             ie       5  +  1         1                       €1,024,726.00    2             €1,024,726.00  

NormalNumber
id  drawResultId  number
--  ------------  ------
1   1             16    

BonusNumber
id  drawResultId  number
--  ------------  ------
49  25            5     
`;


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

module.exports = { SYS_SETUP_STRING, SYS_MSG_FINAL_REFORMAT };