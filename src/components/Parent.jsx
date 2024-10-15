import { useState } from 'react';
import RightDivision from "./RightDivision";
import SubmissionForm from "./SubmissionForm";
import DemoCard from './common/DemoCard';

export default function Parent() {
    const [expenses, setExpenses] = useState([
        {
            title: "Salary",
            date: "5 jan 2024",
            amount: 1000
        },
        {
            title: "Salary",
            date: "6 jan 2024",
            amount: 1000
        }
    ]);

    const [income, setIncome] = useState([
        {
            title: "Salary",
            date: "5 jan 2024",
            amount: 1000
        },
        {
            title: "Salary",
            date: "6 jan 2024",
            amount: 1000
        }
    ]);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + parseFloat(item.amount), 0);
    };

    const handleFormSubmit = (formData, selectedType) => {
        const updatedData = {
            title: formData[selectedType].category,
            date: formData[selectedType].date,
            amount: parseFloat(formData[selectedType].amount),
        };

        if (selectedType === "income") {
            setIncome((prevIncome) => [...prevIncome, updatedData]);
        } else if (selectedType === "expense") {
            setExpenses((prevExpenses) => [...prevExpenses, updatedData]);
        }
    };

    const totalIncome = calculateTotal(income);
    const totalExpenses = calculateTotal(expenses);
    const balance = totalIncome - totalExpenses;

    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm onFormSubmit={handleFormSubmit} />
                <div className="lg:col-span-2">
                    <RightDivision 
                        balance={balance} 
                        totalExpense={totalExpenses} 
                        totalIncome={totalIncome} 
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                        <DemoCard icon={true} data={income} />
                        <DemoCard data={expenses} />
                    </div>
                </div>
            </div>
        </div>
    );
}
