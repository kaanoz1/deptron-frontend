import { State, TStateValue } from "./State";

export class ErrorState extends State {
    protected _value: TStateValue = "Error";

    constructor() {
        super();
    }
}
