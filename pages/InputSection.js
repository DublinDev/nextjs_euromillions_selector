
import React from 'react';

/**
 * Need to add functionality to display progress of query.
 * The procdure should be:
 * - Validate the prompt is safe and valid
 * - Generate the SQL query
 * - Validate the SQL query
 * - Run the SQL query
 * - Validate the response of the query
 * - Reformat the results of the query
 * - Return the results and highlight suggested numbers
 */


const InputSection = ({ inputValue, onKeyDown, onChange, status }) => {
    return (
        <div className="inputSection">
            <input
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter something..."
            />
            <p>The results will go here</p>
            <ul>
                {status.map((statement, index) => (
                    <li key={index}>{statement}</li>
                ))}
            </ul>
        </div>
    );
}

export default InputSection;