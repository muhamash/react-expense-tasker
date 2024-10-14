/* eslint-disable react/prop-types */
// import React from 'react'

export default function BalanceCard({ text, money }) {
    const isNegative = money < 0;
    return (
        <div className="flex flex-col p-6">
            <dt className="text-lg font-medium leading-6 text-gray-900">{text}</dt>
            <dd 
                className={`mt-2 text-3xl font-semibold ${isNegative ? 'text-red-600' : 'text-gray-900'}`}
            >
                ৳ {money.toFixed(2)}
            </dd>
        </div>
    );
}
