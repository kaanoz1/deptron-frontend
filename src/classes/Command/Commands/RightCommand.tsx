"use client";
import { JSX } from "react";
import { Command } from "../Command";
import { ArrowRight } from "lucide-react";

export class RightCommand extends Command {
    protected _command: string = "Right";
    protected _description: string = "Robotu sağa hareket ettirir.";

    constructor() {
        super();
        this._command = "right";
    }

    override getJSXElement(): JSX.Element {
        return <ArrowRight className="w-5 h-5 text-yellow-600" />;
    }
}
