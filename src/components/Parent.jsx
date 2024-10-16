import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";
import DemoCard from './common/DemoCard';

export default function Parent ()
{
    const [ expenses, setExpenses ] = useState( [
        { id: 1, title: "Education", date: "5 Jan 2024", amount: 1600 },
        { id: 2, title: "Bill", date: "6 Jan 2024", amount: 1020 },
        { id: 3, title: "Transport", date: "6 Jan 2024", amount: 1500 }
    ] );
    const [ income, setIncome ] = useState( [
        { id: 1, title: "Salary", date: "5 Jan 2024", amount: 1003 },
        { id: 2, title: "Salary", date: "6 Jan 2024", amount: 1000 },
        { id: 3, title: "Outsourcing", date: "6 Jan 2024", amount: 5000 }
    ] );
    const [editData, setEditData] = useState(null);
    const [selectedType, setSelectedType] = useState("expense");
    const [sortOrderIncome, setSortOrderIncome] = useState(null);
    const [sortOrderExpense, setSortOrderExpense] = useState(null);
    const [filterOptionsIncome, setFilterOptionsIncome] = useState([]);
    const [filterOptionsExpense, setFilterOptionsExpense] = useState([]);

    const calculateTotal = ( items ) =>
    {
        return items.reduce( ( total, item ) => total + parseFloat( item.amount ), 0 );
    };

    const handleFormSubmit = ( formData, selectedType ) =>
    {
        const updatedData = {
            id: editData ? editData.id : Date.now(),
            title: formData[ selectedType ].category,
            date: formData[ selectedType ].date,
            amount: parseFloat( formData[ selectedType ].amount ),
        };

        if ( selectedType === "income" )
        {
            setIncome( ( prevIncome ) =>
                editData
                    ? prevIncome.map( item => item.id === editData.id ? updatedData : item )
                    : [ ...prevIncome, updatedData ]
            );
        } else if ( selectedType === "expense" )
        {
            setExpenses( ( prevExpenses ) =>
                editData
                    ? prevExpenses.map( item => item.id === editData.id ? updatedData : item )
                    : [ ...prevExpenses, updatedData ]
            );
        }

        setEditData( null );
    };

    const handleDelete = ( id, type ) =>
    {
        if ( type === "income" )
        {
            setIncome( income.filter( item => item.id !== id ) );
        } else if ( type === "expense" )
        {
            setExpenses( expenses.filter( item => item.id !== id ) );
        }
    };

    const handleEdit = ( data, type ) =>
    {
        if ( type === "income" )
        {
            setEditData( income.find( item => data.id === item.id ) );
        } else if ( type === "expense" )
        {
            setEditData( expenses.find( item => data.id === item.id ) );
        }
        setSelectedType( type );
    };

    const handleSort = ( type, order ) =>
    {
        if ( type === 'income' )
        {
            setSortOrderIncome( order );
        } else if ( type === 'expense' )
        {
            setSortOrderExpense( order );
        }
    };

    const handleFilter = ( type, filters ) =>
    {
        if ( type === 'income' )
        {
            setFilterOptionsIncome( filters );
        } else if ( type === 'expense' )
        {
            setFilterOptionsExpense( filters );
        }
    };

    const applySort = ( data, type ) =>
    {
        const order = type === 'income' ? sortOrderIncome : sortOrderExpense;
        if ( !order ) return data;
        return [ ...data ].sort( ( a, b ) => order === 'asc' ? a.amount - b.amount : b.amount - a.amount );
    };

    const applyFilter = ( data, type ) =>
    {
        const filters = type === 'income' ? filterOptionsIncome : filterOptionsExpense;
        if ( filters.length === 0 ) return data;
        return data.filter( item => filters.includes( item.title ) );
    };

    const totalIncome = calculateTotal(income);
    const totalExpenses = calculateTotal(expenses);
    const balance = totalIncome - totalExpenses;

    const sortedFilteredIncome = applyFilter(applySort(income, 'income'), 'income');
    const sortedFilteredExpenses = applyFilter(applySort(expenses, 'expense'), 'expense');

    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm
                    onFormSubmit={ handleFormSubmit }
                    editData={ editData }
                    selectedType={ selectedType }
                    setSelectedType={ setSelectedType }
                />
                <div className="lg:col-span-2">
                    <RightDivision balance={ balance } totalExpense={ totalExpenses } totalIncome={ totalIncome } />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <DemoCard
                            icon={ true }
                            data={ sortedFilteredIncome }
                            type="income"
                            onDelete={ handleDelete }
                            onEdit={ handleEdit }
                            onSort={ ( order ) => handleSort( 'income', order ) }
                            onFilter={ ( filters ) => handleFilter( 'income', filters ) }
                        />
                        <DemoCard
                            data={ sortedFilteredExpenses }
                            type="expense"
                            onDelete={ handleDelete }
                            onEdit={ handleEdit }
                            onSort={ ( order ) => handleSort( 'expense', order ) }
                            onFilter={ ( filters ) => handleFilter( 'expense', filters ) }
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}