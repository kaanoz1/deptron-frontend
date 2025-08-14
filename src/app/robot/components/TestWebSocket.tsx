"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = { connection: HubConnection; isMqttWorking: boolean };

const TestWebSocketInput: FC<Props> = ({ connection, isMqttWorking }) => {
    const [inputValue, setInputValue] = useState("");
    const [log, setLog] = useState<TestEntity[]>([]);
    const [_, setTick] = useState(0);

    useEffect(() => {
        connection.on("test", (message: string) => {
            const entry = new TestEntity(message);
            setLog((prev) => [entry, ...prev]);
        });

        return () => {
            connection.off("test");
        };
    }, [connection]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        try {
            await connection.invoke("TestMqtt", inputValue);
            toast.success("TestMqtt gönderildi", { description: inputValue });
            setInputValue("");
        } catch (error) {
            console.error("TestMqtt gönderme hatası:", error);
            toast.error("Gönderim başarısız.");
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full border p-4 rounded-md bg-muted/50">
            <h3 className="text-lg font-semibold">WebSocket Test Girdisi</h3>
            <div className="flex gap-2">
                <Input
                    disabled={!isMqttWorking}
                    placeholder={
                        isMqttWorking
                            ? "Test mesajı girin..."
                            : "MQTT bağlantısı yok."
                    }
                    value={
                        isMqttWorking ? inputValue : "MQTT bağlantısı kesildi."
                    }
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full"
                />
                <Button onClick={handleSend} disabled={!isMqttWorking}>
                    Gönder
                </Button>
            </div>

            <div className="mt-2">
                <h4 className="text-sm font-semibold mb-1 text-muted-foreground">
                    Gelen Mesajlar (test):
                </h4>
                <ul className="text-sm max-h-40 overflow-auto space-y-1 font-mono">
                    {log.map((item, index) => (
                        <li key={index} className="bg-background p-1 rounded">
                            {item.input} - {item.getRelativeTime()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TestWebSocketInput;

class TestEntity {
    constructor(
        public readonly input: string,
        public readonly received: Date = new Date(),
    ) {}

    getRelativeTime(): string {
        const now = new Date();
        const diffMs = now.getTime() - this.received.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours} saat`);
        if (minutes > 0 || hours > 0) parts.push(`${minutes} dakika`);
        parts.push(`${seconds} saniye`);

        return `${parts.join(", ")} önce`;
    }
}
