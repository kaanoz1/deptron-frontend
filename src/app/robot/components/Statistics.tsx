"use client";
import SpeedIndicator from "./SpeedIndicator";

import RuntimeIndicator from "./RuntimeIndicator";
import { HubConnection } from "@microsoft/signalr";
import ChargeIndicator from "./ChargeIndicator";
import { FC } from "react";

type Props = { connection: HubConnection };

const Statistics: FC<Props> = ({ connection }) => {
    return (
        <div className="flex items-center gap-4">
            <SpeedIndicator connection={connection} />,
            <RuntimeIndicator connection={connection} />,
            <ChargeIndicator connection={connection} />
        </div>
    );
};

export default Statistics;
