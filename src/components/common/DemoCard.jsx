/* eslint-disable react/prop-types */
import DataCard from "./DataCard";
import DemoHeader from "./DemoHeader";

export default function DemoCard({ icon, data, type, onDelete, onEdit, onSort, onFilter }) {
    return (
        <div className="relative border rounded-md h-[350px]">
            <DemoHeader icon={ icon } onSort={ onSort } onFilter={ onFilter } />
            <div className="p-4 divide-y w-full h-[275px] relative overflow-y-scroll overflow-x-hidden">
                { data?.length > 4 && (
                    <div className="absolute top-0 left-0 w-full text-center text-[10px] text-gray-400">
                        Please scroll if data overflows
                    </div>
                ) }
                { data?.length === 0 ? (
                    <div className="text-center text-red-500 mt-4">
                        No data available.
                    </div>
                ) : (
                    data?.map( ( d ) => (
                        <DataCard
                            key={ d.id }
                            title={ d.title }
                            amount={ d.amount }
                            date={ d.date }
                            onDelete={ () => onDelete( d.id, type ) }
                            onEdit={ () => onEdit( d, type ) }
                        />
                    ) )
                )
                }
            </div>
        </div>
    );
}
