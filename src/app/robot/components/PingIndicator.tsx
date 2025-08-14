"use client"

import { HubConnection } from "@microsoft/signalr";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { connection: HubConnection };

const PingIndicator = ({ connection }: Props) => {
    const [pingNs, setPingNs] = useState<number | null>(null);

    useEffect(() => {
        if (!connection) return;

        const handlePingRequest = (sentAt: string) => {
            connection.invoke("PingResponse", sentAt);
        };

        const handlePingResult = (latencyNs: number) => {
            setPingNs(latencyNs);
        };

        connection.on("ping_request", handlePingRequest);
        connection.on("ping_result", handlePingResult);

        return () => {
            connection.off("ping_request", handlePingRequest);
            connection.off("ping_result", handlePingResult);
        };
    }, [connection]);

    const display = (() => {
        if (pingNs === null) return null;
        const ms = pingNs / 1_000_000;
        return ms < 1 ? `${pingNs.toLocaleString()} ns` : `${ms.toFixed(1)} ms`;
    })();

    const color =
        pingNs === null
            ? "bg-gray-300"
            : pingNs <= 100_000_000
              ? "bg-green-500"
              : pingNs <= 250_000_000
                ? "bg-yellow-400"
                : pingNs <= 999_000_000
                  ? "bg-red-500"
                  : "bg-black";

    return (
        <div className="flex items-center gap-2">
            <span className={cn("h-3 w-3 rounded-full", color)} />
            <p>Ping</p>
            {display && (
                <span className="text-lg text-muted-foreground">{display}</span>
            )}
        </div>
    );
};

export default PingIndicator;
