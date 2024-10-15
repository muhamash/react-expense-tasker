/* eslint-disable react/prop-types */
import DataCard from "./DataCard";
import DemoHeader from "./DemoHeader";

export default function DemoCard({ icon, data }) {
    return (
        <div className="relative border rounded-md h-[350px] ">
            <DemoHeader icon={icon} />
            <div className="p-4 divide-y w-full h-[275px] relative overflow-y-scroll overflow-x-hidden">
                {data?.length > 4 && (
                    <div className="absolute top-0 left-0 w-full text-center text-[10px] text-gray-400">
                        Please scroll if data overflows
                    </div>
                )}

                {data?.map((d, index) => (
                    <DataCard key={index} title={d.title} amount={d.amount} date={d.date} />
                ))}
            </div>
        </div>
    );
}
