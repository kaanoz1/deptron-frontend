"use client";

import { HubConnection } from "@microsoft/signalr";
import { Clock } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = { connection: HubConnection };

const RuntimeIndicator: FC<Props> = ({ connection }) => {
    const startMsRef = useRef<number | null>(null);
    const [elapsedSec, setElapsedSec] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        const handler = (value: string) => {
            if (value === "start") {
                toast.success("Çalışma süresi başlatıldı.");
                startMsRef.current = Date.now();
                setElapsedSec(0);
                setRunning(true);
            } else if (value === "stop") {
                toast.warning("Çalışma süresi duraklatıldı.");

                setRunning(false);
            } else if (value === "reset") {
                toast.error("Çalışma süresi sıfırlandı.");

                startMsRef.current = null;
                setElapsedSec(0);
                setRunning(false);
            }
        };

        connection.on("runtime", handler);
        return () => {
            connection.off("runtime", handler);
        };
    }, [connection]);

    useEffect(() => {
        if (!running) return;
        const tick = () => {
            if (startMsRef.current != null) {
                const diffMs = Date.now() - startMsRef.current;
                setElapsedSec(Math.floor(diffMs / 1000));
            }
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [running]);

    const minutes = Math.floor(elapsedSec / 60);
    const seconds = elapsedSec % 60;
    const two = (n: number) => String(n).padStart(2, "0");

    return (
        <div className="flex items-center gap-1 text-sm">
            <Clock className="w-8 h-8" />
            <span className="text-xl">
                {minutes}dk {two(seconds)}sn
            </span>
        </div>
    );
};

export default RuntimeIndicator;
