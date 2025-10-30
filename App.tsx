
import React, { useState, useMemo } from 'react';
import DateTimePicker from './components/DateTimePicker';
import ResultCard from './components/ResultCard';
import { calculateAllowance } from './utils/calculation';

// A simple icon component defined locally for single use.
const CalculatorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

function App() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [result, setResult] = useState<{ duration: string; allowance: number } | null>(null);

    const isFormValid = useMemo(() => {
        if (!startDate || !endDate) {
            return false;
        }
        return endDate.getTime() > startDate.getTime();
    }, [startDate, endDate]);

    const handleCalculate = () => {
        if (startDate && endDate && isFormValid) {
            const calculationResult = calculateAllowance(startDate, endDate);
            if (calculationResult) {
                setResult({
                    duration: calculationResult.durationString,
                    allowance: calculationResult.allowance,
                });
            }
        } else {
            setResult(null);
        }
    };
    
    // For the min attribute of the end date picker
    const minEndDate = startDate ? startDate.toISOString().split('T')[0] : undefined;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <main className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <CalculatorIcon />
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Kalkulator Delegacji</h1>
                    </div>
                    <p className="text-gray-600">Oblicz dietę za podróż służbową.</p>
                </div>

                <div className="space-y-6">
                    <DateTimePicker
                        label="Początek delegacji"
                        value={startDate}
                        onChange={setStartDate}
                    />
                    <DateTimePicker
                        label="Koniec delegacji"
                        value={endDate}
                        onChange={setEndDate}
                        min={minEndDate}
                    />
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleCalculate}
                        disabled={!isFormValid}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-full text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                    >
                        Oblicz
                    </button>
                    {!isFormValid && startDate && endDate && (
                        <p className="text-center text-red-500 text-sm mt-3">Data końcowa musi być późniejsza niż początkowa.</p>
                    )}
                </div>

                {result && <ResultCard duration={result.duration} allowance={result.allowance} />}
            </main>
            <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>Stawka diety: 45 zł za każde 12 godzin podróży.</p>
            </footer>
        </div>
    );
}

export default App;
