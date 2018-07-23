/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Parser Icon Class
 */

export default class Parser {
    private _str: string;

    public constructor(str: string) {
        this._str = str;
    }

    public getOneDigitResult(): string {
        return this._str.substring(0, 1).toUpperCase();
    }

    public getTwoDigitResult(): string {
        let arr: string[] = this._str.split(" ");
        switch (arr.length) {
            case 1:
                if (arr[0].length === 0) {
                    return "**";
                }
                return this._str.substring(0, 1).toUpperCase() + this._str.substring(this._str.length - 1, this._str.length).toLowerCase();

            case 2:
                return arr[0].substring(0, 1).toUpperCase() + arr[1].substring(0, 1).toUpperCase();

            default:
                return arr[0].substring(0, 1).toUpperCase() + arr[arr.length - 1].substring(0, 1).toUpperCase();

        }
    }

    public getThreeDigitResult(): string {
        let arr: string[] = this._str.split(" ");
        switch (arr.length) {
            case 1:
                if (arr[0].length === 0) {
                    return "***";
                }
                if (this._str.length < 3) {
                    return this._str.substring(0, 1).toUpperCase() +
                        this._str.substring(this._str.length - 1, this._str.length).toLowerCase() + "*";
                }
                return this._str.substring(0, 1).toUpperCase() +
                    this._str.substring(1, 2).toLowerCase() +
                    this._str.substring(this._str.length - 1, this._str.length).toLowerCase();

            case 2:
                if (arr[0].length < 2) {
                    if (arr[1].length < 1) {
                        return (arr[0].length === 1 ? (arr[0].toUpperCase() + "*") : "**") + " *";
                    } else if (arr[1].length < 2) {
                        return (arr[0].length === 1 ? (arr[0].toUpperCase() + "*") : arr[1].toUpperCase) + " *";
                    }
                    return arr[0].substring(0, 1).toUpperCase() +
                        arr[1].substring(0, 1).toUpperCase() + " " +
                        arr[1].substring(arr[1].length - 1, arr[1].length).toLowerCase();
                }

                return arr[0].substring(0, 1).toUpperCase() +
                    arr[0].substring(1, 2).toLowerCase() + " " +
                    arr[1].substring(0, 1).toUpperCase();

            case 3:
                return arr[0].substring(0, 1).toUpperCase() +
                    arr[1].substring(0, 1).toLowerCase() + " " +
                    arr[2].substring(0, 1).toUpperCase();

            default:
                return arr[0].substring(0, 1).toUpperCase() +
                    arr[1].substring(0, 1).toLowerCase() + " " +
                    arr[arr.length - 1].substring(0, 1).toUpperCase();
        }
    }

}
