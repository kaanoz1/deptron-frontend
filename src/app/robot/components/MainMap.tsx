"use client";
import { FC } from "react";

import { HubConnection } from "@microsoft/signalr";

type Props = { connection: HubConnection };

const MainMap: FC<Props> = () => {
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="w-full h-[200px] rounded-2xl overflow-hidden border bg-blue-500">
                {/* <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
                <Popup>Test</Popup>
            </MapContainer> */}
            </div>
        </div>
    );
};

export default MainMap;
