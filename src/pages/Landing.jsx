import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';

const Landing = () => {
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearchSubmit = async ({ type, value }) => {
        if (type === 'link') {
            const response = await fetch(import.meta.env.VITE_APP_STORE_DATA, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: value }),
            });
            if (!response.ok) throw new Error('Failed to store data');
        } else {
            const response = await fetch(import.meta.env.VITE_APP_SEARCH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: value }),
            });
            if (!response.ok) throw new Error('Failed to process query');
            const data = await response.json();
            handleResults(data);
            setShowResults(true);
        }
    };

    const handleResults = (data) => {
        setResults(data);
    };

    return (
        <div className="flex flex-col py-20 px-4 transition-all duration-700 items-center justify-center h-screen bg-gray-900 overflow-hidden relative">
            <div className={`w-2/3 max-w-2/3 transition-all duration-700 ease-in-out m-4 ${showResults ? 'translate-y-[-100px]' : ''}`}>
                <SearchBar onResults={handleResults} onSubmit={handleSearchSubmit} />
            </div>
            {(
                <div className="transition-opacity duration-700 ease-in-out opacity-100">
                    <ResultsList results={results} />
                </div>
            )}
        </div>
    );
};

export default Landing;
