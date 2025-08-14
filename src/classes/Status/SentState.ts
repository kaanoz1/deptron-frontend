import { State, TStateValue } from "./State";

export class SentState extends State {
    protected _value: TStateValue = "Sent";

    constructor() {
        super();
    }
}
