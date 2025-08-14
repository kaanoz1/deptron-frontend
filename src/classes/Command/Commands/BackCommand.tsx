"use client";
import { JSX } from "react";
import { Command } from "../Command";
import { ArrowDown } from "lucide-react";

export class BackCommand extends Command {
    protected _command: string = "Backward";
    protected _description: string = "Robotu geri hareket ettirir.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <ArrowDown className="w-5 h-5 text-red-600" />;
    }
}
