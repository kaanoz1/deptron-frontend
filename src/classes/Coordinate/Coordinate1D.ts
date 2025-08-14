"use client";
import { XCoordinate } from "./XCoordinate";

export class Coordinate1D {
    private readonly _x: XCoordinate;

    constructor(x: XCoordinate) {
        this._x = x;
    }

    getX() {
        return this._x;
    }
}
