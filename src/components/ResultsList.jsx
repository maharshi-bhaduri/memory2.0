import React from 'react';

const getColorForScore = (score) => {
    if (score >= 0.7) return 'bg-green-400';
    if (score >= 0.5) return 'bg-yellow-400';
    if (score >= 0.3) return 'bg-orange-400';
    return 'bg-gray-300';
};

const Result = ({ result }) => {
    return (
        <a
            href={result.id}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center py-2 border border-gray-300 rounded-lg p-2
           transition-colors duration-200 hover:bg-blue-900 hover:border-blue-400 text-blue-400
           "
        >
            {result.metadata.title}
        </a>

    );
};

const ResultsList = ({ results }) => {
    return (
        <div
            className="mt-4 w-full max-w-full"
        >
            {Array.isArray(results) ? results.map((result, index) => (
                <div key={index}
                    className="w-full mb-2"
                >
                    <Result result={result} />
                </div>
            )) :
                <div>
                    Search or Feed
                </div>
            }
        </div>
    );
};

export default ResultsList;

