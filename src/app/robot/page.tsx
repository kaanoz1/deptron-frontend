"use client";

import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as signalR from "@microsoft/signalr";
import { BASE_URL } from "@/lib/axiosInstance";
import { toast } from "sonner";
import RFID from "./components/RFID";
import TestWebSocket from "./components/TestWebSocket";
import Maps from "./components/Maps";
import NotificationAndCommandHistory from "./components/NotificationAndCommandHistory";

import Header from "./components/Header";
import { Command } from "@/classes/Command/Command";
import Commands from "./components/Commands";

const Page: NextPage = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(true);
    const [isMqttWorking, setIsMqttWorking] = useState<boolean>(false);
    const [commands, setCommands] = useState<Command[]>([]);

    const connectionRef = useRef<signalR.HubConnection | null>(null);

    const connectSignalR = async () => {
        setIsConnecting(true);

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/hubs/notify`)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.onclose(() => {
            setIsConnected(false);
            toast.error("Sunucu bağlantı koptu.", {
                description: "SignalR bağlantısı kesildi.",
            });
        });

        connection.onreconnecting((error?: Error) => {
            setIsConnected(false);
            toast("Sunucuya yeniden bağlanılıyor...");

            if (error !== undefined) toast.error("Hata! Bağlanılamadı.");
        });

        connection.onreconnected(() => {
            setIsConnected(true);
            toast.success("Sunucuya yeniden bağlandı.");
        });

        connection.on("status", (status: boolean) => {
            setIsMqttWorking(status);

            if (status) toast.success("MQTT çalışıyor.");
            else toast.error("MQTT servisi çalışmayı durdurdu!");
        });

        connection.on("client", (client: boolean) => {
            if (client) toast.success("Bir MQTT istemcisi bağlandı.");
            else toast.error("MQTT istemcisi bağlantısı kesildi.");
        });

        try {
            await connection.start();
            setIsConnected(true);
            toast.success("Sunucuya bağlandı.", {
                description: "Canlı veri akışı sağlanabilir.",
            });
            connectionRef.current = connection;
        } catch (error) {
            console.error("SignalR connection error:", error);
            setIsConnected(false);
        } finally {
            setIsConnecting(false);
        }
    };

    useEffect(() => {
        connectSignalR();

        return () => {
            connectionRef.current?.stop();
        };
    }, []);

    if (!isConnected || connectionRef.current === null) {
        return (
            <div className="h-[calc(100vh-160px)] flex flex-col gap-6 justify-center items-center text-center p-6">
                <div className="text-2xl font-semibold text-red-600">
                    Sunucu çalışmıyor.
                </div>
                <div className="text-muted-foreground text-sm">
                    Sunucu çıktılarını kontrol edin.
                </div>
                <Button
                    onClick={connectSignalR}
                    disabled={isConnecting}
                    className="w-52"
                >
                    {isConnecting ? "Bağlanıyor..." : "Bağlan"}
                </Button>
            </div>
        );
    }

    const connection = connectionRef.current;

    return (
        <div className="h-[calc(100vh-160px)] w-full flex flex-col gap-6 items-center p-6">
            <Header connection={connection} />

            <div className="grid grid-cols-3 auto-rows-min gap-10 w-full px-4">
                {/* <MainMap connection={connection} /> */}
                <div></div>

                <Maps connection={connection} isMqttWorking={isMqttWorking} />

                <NotificationAndCommandHistory connection={connection} />

                <TestWebSocket
                    connection={connection}
                    isMqttWorking={isMqttWorking}
                />

                <RFID connection={connection} />

                <Commands
                    connection={connection}
                    isMqttWorking={isMqttWorking}
                    addCommand={(commandToBeAdded: Command) =>
                        setCommands((prevCommands) => [
                            ...prevCommands,
                            commandToBeAdded,
                        ])
                    }
                    commands={commands}
                    removeCommandAtIndex={(indexParam: number) =>
                        setCommands((prevCommands) =>
                            prevCommands.filter(
                                (_, index) => indexParam !== index,
                            ),
                        )
                    }
                    resetCommands={() => setCommands([])}
                />
            </div>
        </div>
    );
};

export default Page;
