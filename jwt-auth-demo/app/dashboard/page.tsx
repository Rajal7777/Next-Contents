"use client";

import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     fetch('/api/profile', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setData(data));
    // }, []);

    //alternate 
    useEffect(() => {
        async function getProfile() {
            const token = localStorage.getItem('token');

            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            setData(data);
        }

        getProfile();
    }, []);



    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>

        </div>
    );
}