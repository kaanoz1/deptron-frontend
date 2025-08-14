"use client";

import { FC } from "react";
import ControlButtons from "./ControlButtons.";
import { HubConnection } from "@microsoft/signalr";

type Props = { connection: HubConnection; isMqttWorking: boolean };

const Maps: FC<Props> = ({ connection, isMqttWorking }) => {
    return (
        <div className="flex flex-col gap-4 items-center justify-start p-2">
            {/* <MapGrid /> */}

            <h2 className="text-bold text-3xl px-2">Kontrol Butonları</h2>
            <ControlButtons
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
        </div>
    );
};

export default Maps;
