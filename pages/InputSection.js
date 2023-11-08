
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


const InputSection = ({ inputValue, onKeyDown, onChange, status, outcome }) => {

    status = !status ? [] : status;
    console.log(`status: ${status}`);
    // const printOutcome = (outcome) => {
    //     if (Object.keys(outcome).length > 0) {
    //         return (
    //             <div>
    //                 <p>
    //                     <span key="1" className="outcome-title">OriginalQuery</span>{outcome.sql}<br />
    //                     <span key="2" className="outcome-title">SQL</span>{outcome.sql}<br />
    //                     <span key="3" className="outcome-title">RawSQLResponse</span>{outcome.sqlQueryResult}<br />
    //                     {/* <span className="outcome-title">Formatted</span>{outcome.formattedQueryResult}<br/> */}
    //                 </p>
    //             </div>
    //         )
    //     };
    //     return <></>;
    // };

    return (
        <div className="inputSection">
            <input
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter something..."
            />
            <ul>
                <li className="current-status">{status[status.length - 1]}</li>

                {status.map((statement, index) => (
                    <li key={index} className="progress-tracker">{statement}</li>
                ))}
                {outcome !== '' || <li>{outcome}</li>}
            </ul>

            {/* <p>{outcomeJSON.stringify(outcome, null, 2)}</p> */}
            {/* {printOutcome(outcome)} */}
        </div>
    );
}

export default InputSection;