import { RotateCw } from "lucide-react";
import { Command } from "../Command";
import { JSX } from "react";

export class TurnInPlaceRight extends Command {
    protected _command: string = "TurnInPlaceRight";
    protected _description: string = "Robotu yerinde sağa döndürür.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return (
            <RotateCw
                className="w-5 h-5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-transform duration-200 hover:rotate-90 drop-shadow-sm"
                strokeWidth={2.25}
                absoluteStrokeWidth
                aria-label="Yerinde sağa döndür"
                role="img"
            />
        );
    }
}
