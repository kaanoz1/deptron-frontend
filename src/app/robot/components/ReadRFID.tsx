"use client"

import { HubConnection } from "@microsoft/signalr";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    readRFID: string;
    setStateFunctionForReadRFID: Dispatch<SetStateAction<string>>;
    connection: HubConnection;
};

const ReadRFID: FC<Props> = ({ readRFID }) => {
    return (
        <span className="font-mono text-sm text-muted-foreground break-all">
            {readRFID}
        </span>
    );
};

export default ReadRFID;
