"use client";
import { HubConnection } from "@microsoft/signalr";

import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    writtenRFID: string;
    setStateFunctionForWrittenRFID: Dispatch<SetStateAction<string>>;
    connection: HubConnection;
};

const WrittenRFID: FC<Props> = ({ writtenRFID }) => {
    return (
        <span className="font-mono text-sm text-muted-foreground break-all">
            {writtenRFID}
        </span>
    );
};

export default WrittenRFID;
