import { State, TStateValue } from "./State";

export class SuccessState extends State {
    protected _value: TStateValue = "Success";

    constructor() {
        super();
    }
}
