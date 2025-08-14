"use client";

import { FC, useEffect, useState } from "react";

import { Gauge } from "lucide-react";
import { HubConnection } from "@microsoft/signalr";

type Props = { connection: HubConnection };

const SpeedIndicator: FC<Props> = ({ connection }) => {
    const [speed, setSpeed] = useState<number>(0);

    useEffect(() => {
        const handler = (value: number | string) =>
            setSpeed(typeof value === "string" ? parseInt(value) : value);
        connection.on("speed", handler);
        return () => connection.off("speed", handler);
    }, [connection]);

    return (
        <div className="flex items-center gap-1 text-sm">
            <Gauge className="w-8 h-8" />
            <span className="text-xl">{speed} m/s</span>
        </div>
    );
};

export default SpeedIndicator;
