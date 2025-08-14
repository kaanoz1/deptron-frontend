"use client";
import { HubConnection } from "@microsoft/signalr";
import { FC } from "react";
import NotificationsHistory from "./NotificationsHistory";

type Props = { connection: HubConnection };

const NotificationAndCommandHistory: FC<Props> = ({ connection }) => {
    return (
        <div className="flex flex-col gap-4 p-2">
            <NotificationsHistory connection={connection} />
            {/* <CommandsHistory connection={connection} /> */}
        </div>
    );
};

export default NotificationAndCommandHistory;
