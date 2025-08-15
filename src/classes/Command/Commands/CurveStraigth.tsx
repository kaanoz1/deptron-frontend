import { JSX } from "react";
import { Minus } from "lucide-react";
import { Command } from "../Command";

export class CurveStraight extends Command {
    protected override _command: string = "Curve_0";
    protected override _description: string = "Kavisli çizgi komutu - düz";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return (
            <Minus
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                strokeWidth={2.25}
            />
        );
    }
}
