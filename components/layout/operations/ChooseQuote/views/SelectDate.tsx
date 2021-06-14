import React from 'react'
import useQuoteObtaining from "hooks/useQuoteObtaining";

function SelectDate() {
    const [,quotes] = useQuoteObtaining();
    console.log(quotes)
    return (
        <div>
            
        </div>
    )
}

export default SelectDate;
