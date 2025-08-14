import { Download } from "lucide-react";
import { Command } from "../Command";
import { JSX } from "react";

export class ReleaseCommand extends Command {
    protected _command: string = "Release";
    protected _description: string = "Yükü bıraktırır.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <Download className="h-5 w-5 text-red-600" />;
    }
}
