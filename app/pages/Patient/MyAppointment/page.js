"use client"
import React, { useState } from 'react'
import PatientDashboard from '@/Components/PatientDashboard'
function MedicalRecords() {
    const [list, setlist] = useState([])
    return (
        <>
            <PatientDashboard />
            <div>

            </div>
        </>
    )
}

export default MedicalRecords