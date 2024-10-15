 
/* eslint-disable react/prop-types */
// import React from 'react';
import DataCard from "./DataCard";
import DemoHeader from "./DemoHeader";

export default function DemoCard ( { icon, data } )
{
    console.log( typeof data );
    
    return (
        <div className="border rounded-md relative">
            <DemoHeader icon={ icon } />
            <div className="p-4 divide-y">
                {
                    data?.map( ( d, index ) => (
                        <DataCard key={ index } title={ d.title } amount={ d.amount } date={ d.date } />
                    ) )
                }

                
            </div>
        </div>
    );
}
