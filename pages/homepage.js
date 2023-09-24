import React, { useState } from 'react';
import InputSection from './InputSection';
import EmptySlots from './EmptySlots';
import NumberGrid from './NumberGrid';
import fillNewArray from '../utils/utils';

fillNewArray
const HomePage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(fillNewArray(5, null));
  const [luckyStars, setLuckyStars] = useState(fillNewArray(2, null));
  const [highlightedNumbers, setHighlightedNumber] = useState(fillNewArray(5, null));
  const [highlightedLuckyStar, setHighlightedLuckyStar] = useState(fillNewArray(2, null));
  const [inputValue, setInputValue] = useState('');
  const [sqlString, setSqlString] = useState('');
  const [queryResult, setQueryResult] = useState({});
  const [statusOfprocessing, setStatusOfProcessing] = useState([]);

  // Select a number from the Grid
  const selectNumber = (num) => {
    const firstEmptyIndex = selectedNumbers.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newSelectedNumbers = [...selectedNumbers];
      newSelectedNumbers[firstEmptyIndex] = num;
      setSelectedNumbers(newSelectedNumbers.sort((a, b) => a - b));
    }
  };

  // Select a lucky star from the grid
  const selectLuckyStar = (num) => {
    const firstEmptyIndex = luckyStars.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newLuckyStars = [...luckyStars];
      newLuckyStars[firstEmptyIndex] = num;

      setLuckyStars(newLuckyStars.sort((a, b) => a - b));
    }
  };

  // Deselect a number from the Grid
  const unselectNumber = (index) => {
    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[index] = null;
    setSelectedNumbers(newSelectedNumbers.sort((a, b) => a - b));
  };

  // Deselect one of the selected lucky stars
  const unselectLuckyStar = (index) => {
    const newLuckyStars = [...luckyStars];
    newLuckyStars[index] = null;
    setLuckyStars(newLuckyStars.sort((a, b) => a - b));
  };


  const checkForEnter = async (event) => {
    if (event.key === "Enter") {
      await processPrompt();
    }
  }

  // Main function to tranlaste user prompt into usable data
  const processPrompt = async () => {
    if (event.key === "Enter") {
      setHighlightedNumber([null, null, null, null, null]);
      setLuckyStars([null, null]);
      let status = [];

      status.push('Processing prompt');
      status.push('Generating SQL from prompt');
      setStatusOfProcessing(status);
      console.log(status);
      const resultObj = await getSQLFromPrompt(inputValue);
      status[status.length - 1] = 'SQL Generated';
      status.push('Executing SQL');
      setStatusOfProcessing(status);
      console.log(status);
      const res = await runQueryOnDB(resultObj.sqlQuery);
      status[status.length - 1] = 'SQL Executed';
      status.push('Attempting to format results of SQL query');
      setStatusOfProcessing(status);
      console.log(status);

      let formatted = await formatFinalResult(resultObj, res);
      status[status.length - 1] = 'Results have been reformatted';
      status.push('Highlighting number');
      setStatusOfProcessing(status);
      console.log(status);
      highlightNumbers(formatted.suggestedNumbers);

      status[status.length - 1] = 'Numbers have been highlighted';
      status.push('Done');
      setStatusOfProcessing(status);
      console.log(status);

    }
  };

  // Set the highlighted numbers
  const highlightNumbers = (suggestedNumbers) => {
    setHighlightedNumber(suggestedNumbers['normalNumbers']);
    setHighlightedLuckyStar(suggestedNumbers['bonusNumbers']);
  }

  // 
  const formatFinalResult = async (orinalQueries, sqlResult) => {
    const response = await fetch('/api/reformatResults', {
      method: 'POST',
      body: JSON.stringify({ ...orinalQueries, sqlResult }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    return data;
  };


  const runQueryOnDB = async (sqlQuery) => {

    const disallowedSQLTerms = ["INSERT", "DELETE", "UPDATE", "ALTER", "DROP", "CREATE"];
    if (disallowedSQLTerms.some(term => sqlQuery.toLowerCase().includes(term.toLowerCase()))) {
      throw new Error(`ERROR: The provided SQL query is not allowed`);
    }

    const response = await fetch("/api/queryDB", {
      method: 'POST',
      body: JSON.stringify({ sqlQuery }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json();
    return data;
  }

  const getSQLFromPrompt = async (query) => {
    const response = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    return {
      query,
      sqlQuery: data[0]['message'].content
    };
  };

  const updateInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setInputValue(e.target.value);
  }

  return (
    <div className="App">
      <div className="main-container">
        <InputSection inputValue={inputValue} onKeyDown={checkForEnter} onChange={updateInput} status={statusOfprocessing} />
        <div className="numbers-section">
          <div className="empty-slots-container">
            <div data-testid="normal-numbers-selected">
              <EmptySlots selectedNumbers={selectedNumbers} onUnselect={unselectNumber} numberType="normal" />
            </div>
            <div data-testid='bonus-numbers-selected'>
              <EmptySlots selectedNumbers={luckyStars} onUnselect={unselectLuckyStar} numberType="bonus" />
            </div>
          </div>
          <div className="grids-container">
            <div data-testid="normal-numbers" className="grid-section">
              <NumberGrid maxNumber={50} onSelect={selectNumber} onUnselect={unselectNumber} selectedNumbers={selectedNumbers} highlightedNumbers={highlightedNumbers} />
            </div>
            <div data-testid="bonus-numbers" className="grid-section">
              <NumberGrid maxNumber={12} onSelect={selectLuckyStar} onUnselect={unselectLuckyStar} selectedNumbers={luckyStars} highlightedNumbers={highlightedLuckyStar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
