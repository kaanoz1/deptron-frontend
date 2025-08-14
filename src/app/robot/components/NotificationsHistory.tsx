"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Notification,
    TNotificationConstructorParametersJSON,
} from "@/classes/Notification/Notification";
import { Button } from "@/components/ui/button";
import { HubConnection } from "@microsoft/signalr";
import { Bell, Download } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { toast } from "sonner";

type Props = { connection: HubConnection };

const NotificationsHistory: FC<Props> = ({ connection }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [_, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handler = (obj: TNotificationConstructorParametersJSON) =>
            newNotificationHandler(obj, notifications, setNotifications);

        connection.on("net/notifications", handler);

        return () => {
            connection.off("net/notifications", handler);
        };
    }, [connection, notifications]);

    return (
        <div className="text-sm">
            <div className="flex items-center gap-1 font-semibold">
                <Bell className="w-8 h-8" />
                <p className="text-lg">Bildirimler</p>

                <Button
                    className="ml-auto"
                    onClick={() => onDownloadClickButton(notifications)}
                >
                    <Download className="w-8 h-8" />
                </Button>
            </div>

            {notifications.length === 0 ? (
                <div className="text-muted-foreground text-sm p-4 border border-dashed border-gray-300 rounded-lg bg-muted/50 text-center">
                    Hiçbir bildirim bulunamadı.
                </div>
            ) : (
                <ul className="mt-2 flex flex-col gap-1">
                    {notifications.map((log, index) => (
                        <li key={index} className="flex items-start gap-1">
                            <span className="min-w-[4ch] font-mono text-xs font-semibold">
                                [{log.getType().getTypeString().toUpperCase()}]
                            </span>
                            <div className="flex-1 text-sm">
                                <span className="font-medium">
                                    {log.getTitle()}
                                </span>{" "}
                                <span className="text-muted-foreground">
                                    {log.getDescription()}
                                </span>{" "}
                                <span className="ml-1">{log.getIcon()}</span>{" "}
                                <span className="text-muted-foreground text-xs">
                                    ({log.getDateString()})
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationsHistory;

const onDownloadClickButton = (notifications: Notification[]) => {
    if (notifications.length === 0) {
        toast.info("İndirilecek bildirim bulunamadı.");
        return;
    }

    const content = notifications
        .map((n) => {
            const type = n.getType().getTypeString().toUpperCase();
            const date = n.getDate().toLocaleString("tr-TR");
            const title = n.getTitle();
            const desc = n.getDescription();
            const icon = n.getIcon();

            return `[${type}] ${date} ${title} ${desc} ${icon}`;
        })
        .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `notifications_${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-")}.txt`;
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Bildirimler indirildi.");
};

const newNotificationHandler = (
    obj: TNotificationConstructorParametersJSON,
    notifications: Notification[],
    setNotifications: (data: Notification[]) => void,
) => {
    const notification = Notification.createFromJSON(obj);
    setNotifications([notification, ...notifications]);
};
