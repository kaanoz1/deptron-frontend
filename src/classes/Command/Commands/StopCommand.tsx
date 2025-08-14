import { JSX } from "react";
import { Command } from "../Command";
import { StopCircle } from "lucide-react";

export class StopCommand extends Command {
    protected override _command: string = "Stop";
    protected override _description: string = "Robotu durdurur.";

    override getJSXElement(): JSX.Element {
        return <StopCircle className="w-5 h-5 mr-1 text-red-600" />;
    }
}
