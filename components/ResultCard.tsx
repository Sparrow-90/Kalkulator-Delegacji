
import React from 'react';

interface ResultCardProps {
    duration: string | null;
    allowance: number | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ duration, allowance }) => {
    if (duration === null || allowance === null || allowance < 0) {
        return null;
    }

    const formattedAllowance = allowance.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    });

    return (
        <div className="w-full max-w-md p-6 mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Wynik Obliczeń</h2>
            <div className="space-y-3 text-lg">
                <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Czas trwania:</span>
                    <span className="font-bold text-gray-900 text-right">{duration}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Należna dieta:</span>
                    <span className="text-2xl font-bold text-blue-600">{formattedAllowance}</span>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
