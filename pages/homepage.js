import React, { useState } from 'react';

const EmptySlots = ({ selectedNumbers, onUnselect }) => (
  <div className="empty-slots">
    {selectedNumbers.map((num, index) => (
      <div key={index} className="slot" onClick={() => onUnselect(index)}>
        {num !== null ? num : '-'}
      </div>
    ))}
  </div>
);

const NumberGrid = ({ maxNumber, onSelect, onUnselect, selectedNumbers, highlightedNumber }) => {
  const setSelectedFieldColor = (num) => {
    return selectedNumbers.includes(num) ? (maxNumber > 12 ? 'selected' : 'selected-lucky') : '';
  }

  return (
    <div className="number-grid">
      {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className={`${num === highlightedNumber ? 'highlighted' : ''} ${setSelectedFieldColor(num)}`}
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
  const [highlightedNumber, setHighlightedNumber] = useState(Array(5).fill(null));
  const [highlightedLuckyStar, setHighlightedLuckyStar] = useState(Array(2).fill(null));

  const selectNumber = (num) => {
    console.log('In onSelect');
    console.log(selectedNumbers);

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
    console.log('In unSelect');
    console.log(selectedNumbers, index);

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

  // Function to fetch highlighted numbers based on a query
  const fetchSuggestedNumbers = async (query) => {
    const response = await fetch('/api/get-suggested-numbers', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    setHighlightedNumber(data.numbers);
  };

  // highlightNumber(11);
  return (
    <div className="App">
      <div className="main-container">
        <div className="input-section">
          <input type="text" placeholder="Enter something...dfdfdfd" />
        </div>
        <div className="numbers-section">
          <div className="empty-slots-container">
            <EmptySlots selectedNumbers={selectedNumbers} onUnselect={unselectNumber} />
            <EmptySlots selectedNumbers={luckyStars} onUnselect={unselectLuckyStar} />
          </div>
          <div className="grids-container">
            <div className="grid-section">
              <NumberGrid maxNumber={50} onSelect={selectNumber} onUnselect={unselectNumber} selectedNumbers={selectedNumbers} highlightedNumber={highlightedNumber} />
            </div>
            <div className="grid-section">
              <NumberGrid maxNumber={12} onSelect={selectLuckyStar} onUnselect={unselectLuckyStar} selectedNumbers={luckyStars} highlightedNumber={highlightedLuckyStar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
