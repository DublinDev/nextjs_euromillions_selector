
import React from 'react';


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

export default InputSection;