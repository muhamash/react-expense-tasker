/* eslint-disable react/prop-types */
import Button from "./common/Button";

export default function SubmissionForm({ onFormSubmit, selectedType, editData, setSelectedType, formData, setFormData }) {
    const handleTypeChange = ( type ) =>
    {
        setSelectedType( type );
        setFormData( ( prevData ) => ( {
            ...prevData,
            category: type === 'expense' ? 'Education' : 'Salary',
        } ) );
    };

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) );
    };

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        onFormSubmit();
    };

    // const formatDateForForm = (dateString) => {
    //     const date = new Date(dateString);
    //     return date.toISOString().split('T')[0];
    // };

    console.log( formData );

    return (
        <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md hover:shadow-md min-h-[500px]">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">Expense Tracker</h2>

            <form onSubmit={ handleSubmit }>
                <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
                    <div
                        onClick={ () => handleTypeChange( 'expense' ) }
                        className={ `cursor-pointer text-center flex-1 px-4 py-2 hover:text-slate-900 ${selectedType === 'expense' ? 'bg-teal-600 text-white duration-200 transition-all' : ''}` }
                    >
                        Expense
                    </div>
                    <div
                        onClick={ () => handleTypeChange( 'income' ) }
                        className={ `cursor-pointer text-center flex-1 px-4 py-2 hover:text-slate-900 ${selectedType === 'income' ? 'bg-teal-600 text-white duration-200 transition-all' : ''}` }
                    >
                        Income
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div className="mt-2">
                        <select
                            id="category"
                            name="category"
                            value={ formData.category }
                            onChange={ handleChange }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        >
                            { selectedType === 'expense' ? (
                                <>
                                    <option value="Education">Education</option>
                                    <option value="Food">Food</option>
                                    <option value="Health">Health</option>
                                    <option value="Bill">Bill</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Tax">Tax</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Telephone">Telephone</option>
                                </>
                            ) : (
                                <>
                                    <option value="Salary">Salary</option>
                                    <option value="Outsourcing">Outsourcing</option>
                                    <option value="Bond">Bond</option>
                                    <option value="Dividend">Dividend</option>
                                </>
                            ) }
                        </select>
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                    <div className="mt-2">
                        <input
                            required
                            id="amount"
                            placeholder="1234567890"
                            name="amount"
                            type="number"
                            value={ formData.amount }
                            onChange={ handleChange }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                    <div className="mt-2">
                        <input
                            required
                            id="date"
                            name="date"
                            type="date"
                            value={ formData.date }
                            onChange={ handleChange }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <Button text={editData ? "Update" : "Submit"} type="submit" className={"mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"}/>
                </div>
            </form>
        </div>
    );
}