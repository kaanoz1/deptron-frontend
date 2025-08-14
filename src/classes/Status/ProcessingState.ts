import { State, TStateValue } from "./State";

export class ProcessingState extends State {
    protected _value: TStateValue = "Processing";

    constructor() {
        super();
    }
}
