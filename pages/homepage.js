import React, { useState } from 'react';

const InputSection = ({ inputValue, onKeyDown, onChange }) => (
  <div className="inputSection">
    <input
      type="text"
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Enter something..."
    />
    <p>The results will go here</p>
  </div>
);


const EmptySlots = ({ selectedNumbers, onUnselect }) => (
  <div className="empty-slots">
    {selectedNumbers.map((num, index) => (
      <div key={index} className="slot" onClick={() => onUnselect(index)}>
        {num !== null ? num : '-'}
      </div>
    ))}
  </div>
);

const NumberGrid = ({ maxNumber, onSelect, onUnselect, selectedNumbers, highlightedNumbers }) => {
  const setSelectedFieldColor = (num) => {
    return selectedNumbers.includes(num) ? (maxNumber > 12 ? 'selected' : 'selected-lucky') : '';
  }
  const highlightedNumber = (num) => highlightedNumbers.includes(num) ? 'highlighted' : '';

  return (
    <div className="number-grid">
      {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className={`${highlightedNumber(num)} ${setSelectedFieldColor(num)}`}
          onClick={() => selectedNumbers.includes(num) ? onUnselect(selectedNumbers.indexOf(num)) : onSelect(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}

const HomePage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(Array(5).fill(null));
  const [luckyStars, setLuckyStars] = useState(Array(2).fill(null));
  const [highlightedNumbers, setHighlightedNumber] = useState(Array(5).fill(null));
  const [highlightedLuckyStar, setHighlightedLuckyStar] = useState(Array(2).fill(null));
  const [inputValue, setInputValue] = useState('');
  const [queryResult, setQueryResult] = useState({});

  const selectNumber = (num) => {
    const firstEmptyIndex = selectedNumbers.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newSelectedNumbers = [...selectedNumbers];
      newSelectedNumbers[firstEmptyIndex] = num;
      setSelectedNumbers(newSelectedNumbers.sort((a, b) => a - b));
    }
  };

  const selectLuckyStar = (num) => {
    const firstEmptyIndex = luckyStars.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newLuckyStars = [...luckyStars];
      newLuckyStars[firstEmptyIndex] = num;

      setLuckyStars(newLuckyStars.sort((a, b) => a - b));
    }
  };

  const unselectNumber = (index) => {
    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[index] = null;
    setSelectedNumbers(newSelectedNumbers.sort((a, b) => a - b));
  };

  const unselectLuckyStar = (index) => {
    const newLuckyStars = [...luckyStars];
    newLuckyStars[index] = null;
    setLuckyStars(newLuckyStars.sort((a, b) => a - b));
  };

  // Function to highlight a number
  const highlightNumber = (num) => {
    setHighlightedNumber(num);
  };

  // Function to highlight a Lucky Star
  const highlightLuckyStar = (num) => {
    setHighlightedLuckyStar(num);
  };

  const checkForEnter = async (event) => {
    if (event.key === "Enter") {
      setHighlightedNumber([null,null,null,null,null]);
      setLuckyStars([null,null,null,null,null]);

      const resultObj = await getSQLFromPrompt(inputValue);
      const res = await runQueryOnDB(resultObj.sqlQuery);

      let formatted = await formatFinalResult(resultObj, res);
      highlightNumbers(formatted.suggestedNumbers)
    }
  };

  const highlightNumbers = (suggestedNumbers) => {
    setHighlightedNumber(suggestedNumbers['normalNumbers']);
    setHighlightedLuckyStar(suggestedNumbers['bonusNumbers']);
  }

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
        <InputSection inputValue={inputValue} onKeyDown={checkForEnter} onChange={updateInput} />
        <div className="numbers-section">
          <div className="empty-slots-container">
            <EmptySlots selectedNumbers={selectedNumbers} onUnselect={unselectNumber} />
            <EmptySlots selectedNumbers={luckyStars} onUnselect={unselectLuckyStar} />
          </div>
          <div className="grids-container">
            <div className="grid-section">
              <NumberGrid maxNumber={50} onSelect={selectNumber} onUnselect={unselectNumber} selectedNumbers={selectedNumbers} highlightedNumbers={highlightedNumbers} />
            </div>
            <div className="grid-section">
              <NumberGrid maxNumber={12} onSelect={selectLuckyStar} onUnselect={unselectLuckyStar} selectedNumbers={luckyStars} highlightedNumbers={highlightedLuckyStar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// SELECT totalWinners FROM CountryResult WHERE country = 'fr' \nAND drawResultId = (SELECT id FROM NewDrawResult ORDER BY date DESC LIMIT 1);