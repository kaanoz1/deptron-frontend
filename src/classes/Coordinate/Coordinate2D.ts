"use client";
import { Coordinate1D } from "./Coordinate1D";
import { XCoordinate } from "./XCoordinate";
import { YCoordinate } from "./YCoordinate";

export class Coordinate2D extends Coordinate1D {
    private readonly _y: YCoordinate;

    constructor(x: XCoordinate, y: YCoordinate) {
        super(x);
        this._y = y;
    }

    getY() {
        return this._y;
    }
}
