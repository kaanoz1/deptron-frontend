"use client";

import { FC, useEffect, useState } from "react";
import { BatteryCharging } from "lucide-react";
import { HubConnection } from "@microsoft/signalr";

type Props = { connection: HubConnection };

const BatteryIndicator: FC<Props> = ({ connection }) => {
    const [percent, setPercent] = useState<number>(100);

    useEffect(() => {
        const handler = (value: number | string) =>
            setPercent(typeof value === "string" ? parseInt(value) : value);
        connection.on("charge", handler);
        return () => connection.off("charge", handler);
    }, [connection]);

    const low = percent < 20;
    return (
        <div className="flex items-center gap-1 text-sm">
            <BatteryCharging className="w-8 h-8" />
            <span className={low ? "text-red-500" : ""}>%{percent}</span>
            {low && (
                <span className="text-muted-foreground text-xl">(&lt;20)</span>
            )}
        </div>
    );
};
export default BatteryIndicator;
