"use client";
import { Coordinate2D } from "./Coordinate2D";
import { ZCoordinate } from "./ZCoordinate";
import { XCoordinate } from "./XCoordinate";
import { YCoordinate } from "./YCoordinate";

export class Coordinate3D extends Coordinate2D {
    private readonly _z: ZCoordinate;

    constructor(x: XCoordinate, y: YCoordinate, z: ZCoordinate) {
        super(x, y);
        this._z = z;
    }

    getZ() {
        return this._z;
    }
}
