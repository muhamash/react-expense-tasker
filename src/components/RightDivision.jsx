/* eslint-disable react/prop-types */
// import React from 'react'

import BalanceCard from "./common/BalanceCard";

export default function RightDivision({balance, totalExpense, totalIncome}) {
    return (
        <div className="lg:col-span-2">
            {/* balance show up */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl">
                    <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
                        <BalanceCard text={"Balance"} money={balance}/>
                        <BalanceCard text={"Total Income"} money={totalIncome}/>
                        <BalanceCard text={"Total Expense"} money={totalExpense}/>
                    </dl>
                </div>
            </div>
        </div>
    );
}
