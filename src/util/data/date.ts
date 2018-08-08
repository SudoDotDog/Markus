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
