"use client";

import { HubConnection } from "@microsoft/signalr";
import { FC } from "react";
import PingIndicator from "./PingIndicator";
import Statistics from "./Statistics";

type Props = { connection: HubConnection };

const Header: FC<Props> = ({ connection }) => {
    return (
        <div className="w-full flex justify-between gap-4">
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-xl">Kontrol Paneli</h2>
                    <PingIndicator connection={connection} />
                </div>
            </div>
            <div className="px-4">
                <Statistics connection={connection} />
            </div>
        </div>
    );
};

export default Header;
