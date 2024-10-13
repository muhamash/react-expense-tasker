// import React from 'react'

import SubmissionForm from "./SubmissionForm";

export default function Parent() {
    return (
        <div className="relative mx-auto mt-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubmissionForm />
            </div>
        </div>
    );
}
