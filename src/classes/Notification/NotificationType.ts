"use client";
import { isValidTNotificationType } from "@/types/function";
import { TNotificationType } from "@/types/types";

export type TNotificationTypeConstructorParameters = { type: string };

export type TNotificationTypeConstructorParametersJSON = { type: string };

export class NotificationType {
    private readonly _type: TNotificationType;

    constructor(data: TNotificationTypeConstructorParameters) {
        const { type } = data;

        this._type = isValidTNotificationType(type) ? type : "unknown";
    }

    getTypeString() {
        return this._type;
    }

    static createFromJSON(data: TNotificationTypeConstructorParametersJSON) {
        return new NotificationType({ ...data });
    }
}
