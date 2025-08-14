"use client";
export class Coordinate {
    private readonly _val: number = Number.NaN;

    constructor(val: number) {
        this._val = val;
    }

    getValue() {
        return this._val;
    }
}
