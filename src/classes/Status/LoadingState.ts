import { State, TStateValue } from "./State";

export class LoadingState extends State {
    protected _value: TStateValue = "Loading";

    constructor() {
        super();
    }
}
