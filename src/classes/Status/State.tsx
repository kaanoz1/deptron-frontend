"use client";

import {
    Loader2,
    Send,
    XCircle,
    CheckCircle2,
    PauseCircle,
    Loader,
    HelpCircle,
} from "lucide-react";

export type TStateValue =
    | "Loading"
    | "Sent"
    | "Error"
    | "Success"
    | "Idle"
    | "Processing";

export abstract class State {
    protected abstract _value: TStateValue;

    getValue() {
        return this._value;
    }

    getJSXElement() {
        switch (this._value) {
            case "Loading":
                return <Loader2 className="animate-spin text-blue-500" />;
            case "Sent":
                return <Send className="text-sky-500" />;
            case "Error":
                return <XCircle className="text-red-500" />;
            case "Success":
                return <CheckCircle2 className="text-green-500" />;
            case "Idle":
                return <PauseCircle className="text-gray-400" />;
            case "Processing":
                return <Loader className="animate-spin text-yellow-500" />;
            default:
                return <HelpCircle className="text-gray-300" />;
        }
    }
}
