"use client";

import { JSX } from "react";
import { IdleState } from "../Status/IdleState";
import { State, TStateValue } from "../Status/State";

export type TCommandConstructorParameters = { command: string };

export abstract class Command {
    protected abstract _command: string;
    protected abstract _description: string;
    protected _state: State = new IdleState();

    getCommand() {
        return this._command;
    }

    abstract getJSXElement(): JSX.Element;

    getDescription() {
        return this._description;
    }

    getState() {
        return this._state;
    }

    setState(state: State) {
        this._state = state;
    }

    toJSON(): CommandJSON {
        return { command: this._command, state: this.getState().getValue() };
    }
}

export type CommandJSON = { command: string; state: TStateValue };
