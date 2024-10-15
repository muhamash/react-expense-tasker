 
// import React from 'react'
import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";
import DemoCard from './common/DemoCard';

export default function Parent ()
{
    const [ totalIncome, setTotalIncome ] = useState( 2000 );
    const [ totalExpense, setTotalExpense ] = useState( 0 );
    const [ expenses, setExpenses ] = useState( [] );
    const [ income, setIncome ] = useState( [ {
        title: "Salary",
        date: "5 jan 2024",
        amount: 1000
    },
    {
        title: "Salary",
        date: "6 jan 2024",
        amount: 1000
    }
    ] );

    const balance = totalIncome - totalExpense;
    const handleFormSubmit = ( formData, selectedType ) =>
    {
        const updatedData = {
            ...formData[ selectedType ],
            title: formData[ selectedType ].category,
            date: formData[ selectedType ].date,
            amount:formData[selectedType].amount
        }
        const amount = parseFloat( formData[ selectedType ].amount );
        console.log( formData, selectedType, formData[selectedType], updatedData );
        if ( selectedType === "income" )
        {
            setTotalIncome( prevIncome => prevIncome + amount );
            setIncome( prevIncome => [ ...prevIncome, updatedData ] );

        } else if ( selectedType === "expense" )
        {
            setTotalExpense( prevExpense => prevExpense + amount );
            setExpenses( prevExpense => [ ...prevExpense, updatedData ] );
        }
    };

    console.log( income, expenses );
    
    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm onFormSubmit={ handleFormSubmit } />
                <div className="lg:col-span-2">
                    <RightDivision balance={ balance } totalExpense={ totalExpense } totalIncome={ totalIncome } />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <DemoCard icon={ true } data={ income } />
                        <DemoCard data={expenses}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
