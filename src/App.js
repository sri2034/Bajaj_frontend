import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Multi from './components/Mutli';

const filterOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'lowercase', label: 'Highest lowercase alphabet' },
];

const App = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        document.title = "21BCE9992";
    }, []);

    const handleSubmit = async (jsonData) => {
        const response = await fetch('https://bajaj-backend-7yzo.onrender.com/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });
        const data = await response.json();
        setApiResponse(data);
    };

    const handleFilterChange = (selectedOptions) => {
        setSelectedFilters(selectedOptions.map(option => option.value));
    };

    const filteredResponse = () => {
        if (!apiResponse) return null;

        const filters = {
          alphabets: (item) => /^[a-zA-Z]+$/.test(item),
          numbers: (item) => /^-?\d+(\.\d+)?$/.test(item),  
          lowercase: (item) => /^[a-z]+$/.test(item),
      };
      

        return apiResponse.alphabets.filter(item =>
            selectedFilters.some(filter => filters[filter](item))
        );
    };

    return (
        <div>
            <h1>21BCE9992</h1>
            <Form onSubmit={handleSubmit} />
            {apiResponse && (
                <Multi options={filterOptions} onChange={handleFilterChange} />
            )}
            <div>
                <h2>Filtered Response</h2>
                <p>{filteredResponse()?.join(', ')}</p>
            </div>
        </div>
    );
};

export default App;
