// import React from 'react'
import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";

export default function Parent ()
{
    const [totalIncome, setTotalIncome] = useState(2000); 
    const [ totalExpense, setTotalExpense ] = useState( 0 ); 

    const balance = totalIncome - totalExpense;

    const handleFormSubmit = ( formData, selectedType ) =>
    {
        const amount = parseFloat( formData[selectedType].amount );

        if ( selectedType === "income" )
        {
            setTotalIncome( prevIncome => prevIncome + amount );
        } else if ( selectedType === "expense" )
        {
            setTotalExpense( prevExpense => prevExpense + amount );
        }
    };
    
    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm onFormSubmit={handleFormSubmit}/>
                <RightDivision balance={balance} totalExpense={totalExpense} totalIncome={totalIncome}/>
            </div>
        </div>
    );
}
