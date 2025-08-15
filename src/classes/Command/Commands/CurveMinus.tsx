import { JSX } from "react";
import { Command } from "../Command";
import { RotateCcw, Minus } from "lucide-react";

export class CurveMinus extends Command {
    protected override _command: string = "Curve_m1";
    protected override _description: string = "Kavisli çizgi komutu - eksi";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return (
            <div className="relative inline-flex items-center justify-center">
                <RotateCcw
                    className="w-5 h-5 text-red-600"
                    strokeWidth={2.25}
                />
                <Minus
                    className="w-3 h-3 text-red-700 absolute -right-1 -top-1 bg-white rounded-full"
                    strokeWidth={2.25}
                />
            </div>
        );
    }
}
