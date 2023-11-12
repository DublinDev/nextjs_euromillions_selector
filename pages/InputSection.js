
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


const InputSection = ({ inputValue, onKeyDown, onChange, status, query, outcome }) => {

    status = !status ? [] : status;
    console.log(`status: ${status}`);

    return (
        <div className="input-section">
            <input
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter something..."
            />
            {query !== '' && <div className="printed-query">{query}</div>}
            {outcome !== '' && <div className='printed-outcome'>{outcome}</div>}

            {/* <ul>
                <li className="current-status">{status[status.length - 1]}</li>

                {status.map((statement, index) => (
                    <li key={index} className="progress-tracker">{statement}</li>
                ))}
                {outcome !== '' || <li>{outcome}</li>}
            </ul> */}

            {/* <p>{outcomeJSON.stringify(outcome, null, 2)}</p> */}
            {/* {printOutcome(outcome)} */}
        </div>
    );
}

export default InputSection;