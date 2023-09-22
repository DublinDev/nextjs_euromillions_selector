# Euromillions Results Scrapper
This is a basic project to allow users to query all previous numbers of euromillions draws using natural language and use that information to select numbers for the next draw.


### Tech stack
* NextJs
* React for the frontend
* ChatGPT- to transform the natual language query into an SQL query.


### Running
`npm run dev`


## ToDo

* Implement CHatGPT moderation filter
* Ensure only SELECT queries can be executed againt the DB
* Fine tune ChatGPT for better output by helping it understand the context
* Display some loading indicators in the homepage
* Create tests using playwright - done 
* Write better error handleing in all funcitons
* Reformat code
