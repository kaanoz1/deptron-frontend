import { Pause } from "lucide-react";
import { Command } from "../Command";
import { JSX } from "react";

export class PauseCommand extends Command {
    protected override _command: string = "Pause";
    protected override _description: string = "Robotu duraklatır.";

    override getJSXElement(): JSX.Element {
        return <Pause className="w-5 h-5 mr-1 text-yellow-600" />;
    }
}
