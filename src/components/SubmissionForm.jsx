import { useState } from 'react';
import Button from "./common/Button";

export default function SubmissionForm() {
    const [selectedType, setSelectedType] = useState('expense'); 
    const [ formData, setFormData ] = useState( {
        expense: {
            category: 'Education',
            amount: '',
            date: ''
        },
        income: {
            category: 'Outsourcing',
            amount: '',
            date: ''
        }
    } );

    const handleTypeChange = ( type ) =>
    {
        setSelectedType( type );
    };

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( {
            ...formData,
            [ selectedType ]: {
                ...formData[ selectedType ],
                [ name ]: value
            }
        } );
    };

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        alert( `Form Data Submitted: ${selectedType} `);
    };

    return (
        <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md hover:shadow-md">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">Expense Tracker</h2>

            <form onSubmit={handleSubmit}>
                <div
                    className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6"
                >
                    <div
                        onClick={() => handleTypeChange('expense')}
                        className={`cursor-pointer text-center flex-1 px-4 py-2 hover:text-slate-900 ${selectedType === 'expense' ? 'bg-teal-600 text-white duration-200 transition-all' : ''}`}
                    >
                        Expense
                    </div>
                    <div
                        onClick={() => handleTypeChange('income')}
                        className={`cursor-pointer text-center flex-1 px-4 py-2  hover:text-slate-900 ${selectedType === 'income' ? 'bg-teal-600 text-white duration-200 transition-all' : ''}`}
                    >
                        Income
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div className="mt-2">
                        {selectedType === 'expense' ? (
                            <select
                                id="category"
                                name="category"
                                value={formData.expense.category}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            >
                                <option>Education</option>
                                <option>Food</option>
                                <option>Health</option>
                                <option>Bill</option>
                                <option>Insurance</option>
                                <option>Tax</option>
                                <option>Transport</option>
                                <option>Telephone</option>
                            </select>
                        ) : (
                            <select
                                id="category"
                                name="category"
                                value={formData.income.category}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            >
                                <option>Salary</option>
                                <option>Outsourcing</option>
                                <option>Bond</option>
                                <option>Dividend</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                    <div className="mt-2">
                        <input
                            required
                            type="number"
                            name="amount"
                            id="amount"
                            value={formData[selectedType].amount}
                            onChange={handleChange}
                            placeholder="12931"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                    <div className="mt-2">
                        <input
                            required
                            type="date"
                            name="date"
                            id="date"
                            value={formData[selectedType].date}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
                    text={"Save"}
                />
            </form>
        </div>
    );
}
