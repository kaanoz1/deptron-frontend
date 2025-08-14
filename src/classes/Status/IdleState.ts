import { State, TStateValue } from "./State";

export class IdleState extends State {
    protected _value: TStateValue = "Idle";

    constructor() {
        super();
    }
}
