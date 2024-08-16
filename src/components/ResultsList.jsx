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
            className="flex items-center py-2 whitespace-nowrap border border-gray-300 rounded-lg p-2
               transition-colors duration-200 hover:bg-blue-900 hover:border-blue-400 break-words"
        >
            <div
                className={`h-4 w-4 rounded-full ${getColorForScore(result.score)} mr-2`}
            ></div>
            <span className="text-blue-400 text-ellipsis break-words">
                {result.metadata.title}
            </span>
        </a>

    );
};

const ResultsList = ({ results }) => {
    return (
        <div className="mt-4 w-full max-w-full">
            <ul className="list-none flex flex-col items-center justify-center w-full">
                {Array.isArray(results) ? results.map((result, index) => (
                    <li key={index} className="w-full mb-2">
                        <Result result={result} />
                    </li>
                )) :
                    <div>
                        Search or Feed
                    </div>
                }
            </ul>
        </div>
    );
};

export default ResultsList;

