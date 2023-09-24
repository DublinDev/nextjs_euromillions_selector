import React from 'react';

const NumberGrid = ({ maxNumber, onSelect, onUnselect, selectedNumbers, highlightedNumbers }) => {
    const setSelectedFieldColor = (num) => {
        return selectedNumbers.includes(num) ? (maxNumber > 12 ? 'selected' : 'selected-lucky') : '';
    }
    const highlightedNumber = (num) => highlightedNumbers.includes(num) ? 'highlighted' : '';

    let testId = maxNumber > 12 ? `normal-num` : 'bonus-num';

    return (
        <div className="number-grid">
            {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    className={`${highlightedNumber(num)} ${setSelectedFieldColor(num)}`}
                    data-testid={testId + num}
                    onClick={() => selectedNumbers.includes(num) ? onUnselect(selectedNumbers.indexOf(num)) : onSelect(num)}
                >
                    {num}
                </button>
            ))}
        </div>
    );
}

export default NumberGrid;
