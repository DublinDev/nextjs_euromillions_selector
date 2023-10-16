import React from 'react';

const EmptySlots = ({ selectedNumbers, onUnselect, numberType }) => {

    selectedNumbers = !selectedNumbers ? [null, null,null,null,null] : selectedNumbers;
    return (
        <div className="empty-slots">
            {selectedNumbers.map((num, index) => (
                <div key={index} data-testid={numberType + `-slot-` + (index + 1)} className="slot" onClick={() => onUnselect(index)}>
                    {num !== null ? num : '-'}
                </div>
            ))}
        </div>
    );
}

export default EmptySlots;
