import React, { useState } from 'react';
import Loader from './Loader'; // Adjust the path as necessary
import axios from 'axios';

const SearchBar = ({ onSubmit, onResults }) => {
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isURL = /https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+/.test(inputValue);
        setStatus('processing');

        try {
            if (isURL) {
                await onSubmit({ type: 'link', value: inputValue });
                setStatus('success');
            } else {
                const response = await axios.get(`${import.meta.env.VITE_APP_SEARCH}?q=${inputValue}`);
                onResults(response.data);
                setStatus('query');
            }
        } catch (error) {
            setStatus('error');
        }

        setTimeout(() => {
            setStatus('');
            if (status === 'success') {
                setInputValue('');
            }
        }, 2000);
    };

    const isDisabled = status === 'processing' || status === 'success';
    const statusClass = status === 'success' ? 'bg-green-500 animate-pulse' : '';

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center p-2 border-2 ${statusClass} rounded-md transition-all duration-300 ease-in-out`}
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search or paste a link..."
                className="flex-grow p-2 bg-transparent outline-none text-white disabled:opacity-50 w-full"
                disabled={isDisabled}
            />
            <button
                type="submit"
                className="ml-2 py-2 px-4 bg-blue-600 hover:bg-blue-400 transition-all duration-300 text-white rounded-md disabled:opacity-50 flex items-center justify-center"
                disabled={isDisabled}
            >
                {status === 'processing' ? (
                    <Loader />
                ) : status === 'success' ? (
                    'Link Stored'
                ) : (
                    'Go'
                )}
            </button>
        </form>
    );
};

export default SearchBar;

