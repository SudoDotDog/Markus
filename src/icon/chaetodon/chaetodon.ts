/**
 * @author WMXPY
 * @description Chaetodon
 * @fileoverview Color Storage
 */

export type ColorSet = Array<string[5]>;

export enum COLOR_CODE {
    SUN = 1,
    RAIN,
    SNOW,
    CLOUD,
    FOG,
    HAIL,
    STORM,
    WIND,
    BREEZE,
    STAR,
    TWILIGHT,
    MIDNIGHT,
    NOVA,
    ROSE,
    CHAOS,
}

export const colorList: {
    [key: number]: string[];
} = {
    1: ["fff353", "fec039", "fe8c43", "ed6023", "e20909"],
    2: ["f7f4ea", "ded9e2", "c0b9dd", "80a1d4", "75c9c8"],
    3: ["ced3dc", "fcf7f8", "84c4e4", "3a8ad3", "505050"],
    4: ["dcdcdd", "c5c3c6", "46494c", "4c5c68", "1985a1"],
    5: ["ffcdb2", "ffb4a2", "e5989b", "b5838d", "6d6875"],
    6: ["e63946", "f1faee", "a8dadc", "457b9d", "1d3557"],
    7: ["ee6c4d", "f38d68", "662c91", "17a398", "33312e"],
    8: ["2a4d7f", "b2c9bf", "956974", "f6acad", "f5d5d9"],
    9: ["7bdff2", "b2f7ef", "eff7f6", "f7d6e0", "f2b5d4"],
    10: ["e42e03", "000000", "f0a202", "ffffff", "151617"],
    11: ["05668d", "028090", "00a896", "02c39a", "f0f3bd"],
    12: ["2e1760", "3423a6", "7180b9", "dff3e4", "170a1c"],
    13: ["ffb997", "f67e7d", "843b62", "0b032d", "74546a"],
    14: ["9c89b8", "f0a6ca", "efc3e6", "f0e6ef", "b8bedd"],
    15: ["f6511d", "ffb400", "00a6ed", "7fb800", "0d2c54"],
};

export const chaetodon = (code?: number): ColorSet => {
    if (code && (code in COLOR_CODE)) {
        return colorList[code];
    } else if (code && !(code in COLOR_CODE)) {
        const index: COLOR_CODE = (Math.floor(code % (Object.keys(COLOR_CODE).length / 2))) + 1;
        return colorList[index];
    } else {
        let ran: COLOR_CODE = (Math.floor((Math.random() * 1000)) % 15) + 1;
        return colorList[ran];
    }
};
