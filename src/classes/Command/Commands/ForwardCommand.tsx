"use client";
import { JSX } from "react";
import { Command } from "../Command";
import { ArrowUp } from "lucide-react";

export class ForwardCommand extends Command {
    protected _command: string = "Forward";
    protected _description: string = "Robotu ileri hareket ettirir.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <ArrowUp className="w-5 h-5 text-blue-600" />;
    }
}
