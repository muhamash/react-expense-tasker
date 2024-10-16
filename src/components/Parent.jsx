import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";
import DemoCard from './common/DemoCard';

const initialFormData = {
    category: 'Education',
    amount: '',
    date: '',
};

export default function Parent() {
    const [ transactions, setTransactions ] = useState( [
        { id: 1, type: 'expense', category: "Education", date: "2024-01-05", amount: 1600 },
        { id: 2, type: 'expense', category: "Bill", date: "2024-01-06", amount: 1020 },
        { id: 3, type: 'expense', category: "Transport", date: "2024-01-06", amount: 1500 },
        { id: 4, type: 'income', category: "Salary", date: "2024-01-05", amount: 1003 },
        { id: 5, type: 'income', category: "Salary", date: "2024-01-06", amount: 1000 },
        { id: 6, type: 'income', category: "Outsourcing", date: "2024-01-06", amount: 5000 },
    ] );

    const [formData, setFormData] = useState(initialFormData);
    const [selectedType, setSelectedType] = useState("expense");
    const [editTransaction, setEditTransaction] = useState(null);
    const [sortOrder, setSortOrder] = useState({ income: null, expense: null });
    const [filterOptions, setFilterOptions] = useState({ income: [], expense: [] });

    const calculateTotal = ( items ) => items.reduce( ( total, item ) => total + parseFloat( item.amount ), 0 );

    const handleFormSubmit = () =>
    {
        const updatedTransaction = {
            id: editTransaction ? editTransaction.id : Date.now(),
            ...formData,
            amount: parseFloat( formData.amount ),
            type: selectedType,
        };

        setTransactions( ( prev ) =>
            editTransaction
                ? prev.map( ( item ) => ( item.id === editTransaction.id ? updatedTransaction : item ) )
                : [ ...prev, updatedTransaction ]
        );

        resetForm();
    };

    const handleDelete = ( id ) =>
    {
        setTransactions( transactions.filter( ( item ) => item.id !== id ) );
    };

    const handleEdit = ( data ) =>
    {
        setEditTransaction( data );
        setFormData( { category: data.category, amount: data.amount, date: data.date } );
        setSelectedType( data.type );
    };

    const resetForm = () =>
    {
        setEditTransaction( null );
        setFormData( initialFormData );
        setSelectedType( 'expense' );
    };

    const handleSort = ( type, order ) =>
    {
        setSortOrder( ( prev ) => ( { ...prev, [ type ]: order } ) );
    };

    const handleFilter = ( type, filters ) =>
    {
        setFilterOptions( ( prev ) => ( { ...prev, [ type ]: filters } ) );
    };

    const applySortAndFilter = ( data, type ) =>
    {
        const order = sortOrder[ type ];
        const filters = filterOptions[ type ];

        let result = [ ...data ];
        if ( filters.length )
        {
            result = result.filter( ( item ) => filters.includes( item.category ) ); // Change 'item.title' to 'item.category'
        }
        if ( order )
        {
            result.sort( ( a, b ) => ( order === 'asc' ? a.amount - b.amount : b.amount - a.amount ) );
        }
        return result;
    };

    const totalIncome = calculateTotal(transactions.filter(item => item.type === 'income'));
    const totalExpenses = calculateTotal(transactions.filter(item => item.type === 'expense'));
    const balance = totalIncome - totalExpenses;

    const sortedFilteredIncome = applySortAndFilter(transactions.filter(item => item.type === 'income'), 'income');
    const sortedFilteredExpenses = applySortAndFilter(transactions.filter(item => item.type === 'expense'), 'expense');

    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm
                    onFormSubmit={ handleFormSubmit }
                    editData={ editTransaction }
                    selectedType={ selectedType }
                    setSelectedType={ setSelectedType }
                    formData={ formData }
                    setFormData={ setFormData }
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
