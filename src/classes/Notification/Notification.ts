"use client";
import {
    NotificationType,
    TNotificationTypeConstructorParametersJSON,
} from "./NotificationType";

export type TNotificationConstructorParameters = {
    title: string;
    description: string;
    type: NotificationType;
    date: string | Date;
};

export type TNotificationConstructorParametersJSON = {
    title: string;
    description: string;
    type: TNotificationTypeConstructorParametersJSON;
    date: string | Date;
};

export class Notification {
    private readonly _date: Date;
    private readonly _title: string;
    private readonly _description: string;
    private readonly _type: NotificationType;

    constructor(data: TNotificationConstructorParameters) {
        const { title, description, type, date } = data;
        this._title = title;
        this._description = description;
        this._type = type;
        this._date = new Date(date);
    }

    getDate() {
        return this._date;
    }

    getDateString(): string {
        const now = new Date();
        const diffMs = now.getTime() - this._date.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        const parts: string[] = [];

        if (hours > 0) parts.push(`${hours} saat`);
        if (minutes > 0 || hours > 0) parts.push(`${minutes} dakika`);
        parts.push(`${seconds} saniye`);

        return `${parts.join(", ")} önce`;
    }

    getTitle() {
        return this._title;
    }
    getDescription() {
        return this._description;
    }

    getType() {
        return this._type;
    }

    getIcon() {
        switch (this._type.getTypeString()) {
            case "success":
                return "✅";
            case "error":
                return "❗";
            case "warning":
                return "⚠️";
            case "fatal":
                return "💀";
            case "unexpected":
                return "❓";
            default:
                return "❔";
        }
    }

    static createFromJSON(data: TNotificationConstructorParametersJSON) {
        const type = NotificationType.createFromJSON(data.type);
        return new Notification({ ...data, type });
    }
}
