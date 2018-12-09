/**
 * @author WMXPY
 * @description Date
 * @fileoverview Date Utils
 */

export const appropriateCurrentDateName = (name: string) => {
    return `${name}_${appropriateCurrentDateString()}`;
};

export const appropriateCurrentDateString = () => {
    const now = new Date();
    return appropriateDateString(now);
};

export const appropriateDateString = (date: Date) => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    return `${year}-${month}-${day}`;
};

export const appropriateDateStringWithTime = (date: Date) => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    const area: number = date.getTimezoneOffset();
    let areaStr: string;

    if (area >= 0) {
        areaStr = '+' + area.toString();
    } else {
        areaStr = area.toString();
    }

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}(UTC${areaStr})`;
};

export const availableAnythingToDate = (num: any): Date | undefined => {
    if (num) {
        const parsed = parseInt(num, 10);
        if (parsed) {
            return new Date(parsed);
        }
        return void 0;
    } else {
        return void 0;
    }
};

export const differenceToTimeString = (difference: number): string => {
    const seconds: number = parseFloat((difference / 1000).toFixed(1));
    const minutes: number = parseFloat((difference / (1000 * 60)).toFixed(1));
    const hours: number = parseFloat((difference / (1000 * 60 * 60)).toFixed(1));
    const days: number = parseFloat((difference / (1000 * 60 * 60 * 24)).toFixed(1));

    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days";
    }
};

export const differenceToHour = (difference: number): number => {
    return Math.floor(difference / 3600000);
};
