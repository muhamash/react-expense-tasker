import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";
import DemoCard from './common/DemoCard';

export default function Parent() {
    const [ expenses, setExpenses ] = useState( [
        { id: 1, title: "Salary", date: "5 jan 2024", amount: 1000 },
        { id: 2, title: "Salary", date: "6 jan 2024", amount: 1000 }
    ] );

    const [income, setIncome] = useState([
        { id: 1, title: "Salary", date: "5 jan 2024", amount: 1000 },
        { id: 2, title: "Salary", date: "6 jan 2024", amount: 1000 }
    ] );
    
    const [editData, setEditData] = useState(null);
    const [selectedType, setSelectedType] = useState("expense");

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + parseFloat(item.amount), 0);
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
        setEditData( data );
        setSelectedType( type );
    };

    const totalIncome = calculateTotal(income);
    const totalExpenses = calculateTotal(expenses);
    const balance = totalIncome - totalExpenses;

    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm
                    onFormSubmit={ handleFormSubmit }
                    editData={ editData }
                    selectedType={ selectedType }
                />
                <div className="lg:col-span-2">
                    <RightDivision balance={ balance } totalExpense={ totalExpenses } totalIncome={ totalIncome } />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <DemoCard
                            icon={ true }
                            data={ income }
                            type="income"
                            onDelete={ handleDelete }
                            onEdit={ handleEdit }
                        />
                        <DemoCard
                            data={ expenses }
                            type="expense"
                            onDelete={ handleDelete }
                            onEdit={ handleEdit }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}