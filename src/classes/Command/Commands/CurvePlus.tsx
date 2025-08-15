import { JSX } from "react";
import { Command } from "../Command";
import { Plus, RotateCcw } from "lucide-react";

export class CurvePlus extends Command {
    protected override _command: string = "Curve_1";
    protected override _description: string = "Kavisli çizgi komutu - artı";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return (
            <div className="relative inline-flex items-center justify-center">
                <RotateCcw
                    className="w-5 h-5 text-green-600"
                    strokeWidth={2.25}
                />
                <Plus
                    className="w-3 h-3 text-green-700 absolute -right-1 -top-1 bg-white rounded-full"
                    strokeWidth={2.25}
                />
            </div>
        );
    }
}
