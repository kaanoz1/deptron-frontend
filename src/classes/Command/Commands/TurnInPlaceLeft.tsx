import { JSX } from "react";
import { Command } from "../Command";
import { RotateCcw } from "lucide-react";

export class TurnInPlaceLeft extends Command {
    protected _command: string = "TurnInPlaceLeft";
    protected _description: string = "Robotu yerinde sola döndürür.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return (
            <RotateCcw
                className="w-5 h-5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-transform duration-200 hover:-rotate-90 drop-shadow-sm"
                strokeWidth={2.25}
                absoluteStrokeWidth
            />
        );
    }
}
