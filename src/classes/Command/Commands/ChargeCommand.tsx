import { Battery } from "lucide-react";
import { Command } from "../Command";
import { JSX } from "react";

export class ChargeCommand extends Command {
    protected _command: string = "Charge";
    protected _description: string = "Robotu şarj istasyonuna yönlendirir.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <Battery className="w-5 h-5 text-cyan-300" />;
    }
}
