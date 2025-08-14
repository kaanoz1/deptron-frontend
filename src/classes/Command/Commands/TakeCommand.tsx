import { JSX } from "react";
import { Command } from "../Command";
import { Upload } from "lucide-react";

export class TakeCommand extends Command {
    protected _command: string = "Take";
    protected _description: string = "Yük aldırır.";

    constructor() {
        super();
    }

    override getJSXElement(): JSX.Element {
        return <Upload className="h-5 w-5 text-green-600 " />;
    }
}
