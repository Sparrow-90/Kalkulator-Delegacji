
const ALLOWANCE_RATE_PER_12_HOURS = 45; // 45 PLN

interface CalculationResult {
    totalHours: number;
    days: number;
    hours: number;
    allowance: number;
    durationString: string;
}

const getPluralForm = (count: number, forms: [string, string, string]): string => {
    if (count === 1) {
        return forms[0];
    }
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
        return forms[2];
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return forms[1];
    }
    return forms[2];
};

export const calculateAllowance = (startDate: Date, endDate: Date): CalculationResult | null => {
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate >= endDate) {
        return null;
    }

    const diffMilliseconds = endDate.getTime() - startDate.getTime();
    const totalHours = diffMilliseconds / (1000 * 60 * 60);

    const allowance = (totalHours / 12) * ALLOWANCE_RATE_PER_12_HOURS;

    const totalMinutes = diffMilliseconds / (1000 * 60);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    
    const dayForms: [string, string, string] = ['dzień', 'dni', 'dni'];
    const hourForms: [string, string, string] = ['godzina', 'godziny', 'godzin'];

    const durationParts: string[] = [];
    if (days > 0) {
        durationParts.push(`${days} ${getPluralForm(days, dayForms)}`);
    }
    if (hours > 0) {
        durationParts.push(`${hours} ${getPluralForm(hours, hourForms)}`);
    }
    
    const durationString = durationParts.length > 0 ? durationParts.join(', ') : 'Poniżej godziny';

    return {
        totalHours,
        days,
        hours,
        allowance,
        durationString,
    };
};
