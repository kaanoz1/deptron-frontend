"use client";
import { JSX } from "react";
import { Command } from "../Command";
import { ArrowLeft } from "lucide-react";

export class LeftCommand extends Command {
    protected _command: string = "Left";
    protected _description: string = "Robotu sola hareket ettirir.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <ArrowLeft className="w-5 h-5 text-green-600" />;
    }
}
