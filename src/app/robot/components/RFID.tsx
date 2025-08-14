"use client";

import { Button } from "@/components/ui/button";
import { HubConnection } from "@microsoft/signalr";
import { Download, QrCode } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import ReadRFID from "./ReadRFID";
import WrittenRFID from "./WrittenRFID";

type Props = { connection: HubConnection };

const RFID: FC<Props> = ({ connection }) => {
    const [readRFID, setReadRFID] = useState<string>("-");
    const [writtenRFID, setWrittenRFID] = useState<string>("-");

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                    <QrCode className="w-10 h-10" />
                    <h3 className="text-2xl font-bold">RFID Bilgisi</h3>
                </div>

                <Button
                    onClick={() => downloadButtonOnClick(readRFID, writtenRFID)}
                >
                    <Download className="w-8 h-8" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1 items-center border p-3 rounded-md w-full bg-muted/50">
                    <h5 className="text-lg font-semibold">
                        Okunan RFID bilgisi
                    </h5>
                    <ReadRFID
                        readRFID={readRFID}
                        setStateFunctionForReadRFID={setReadRFID}
                        connection={connection}
                    />
                </div>

                <div className="flex flex-col gap-1 items-center border p-3 rounded-md w-full bg-muted/50">
                    <h5 className="text-lg font-semibold">
                        Yazılan RFID bilgisi
                    </h5>
                    <WrittenRFID
                        writtenRFID={writtenRFID}
                        setStateFunctionForWrittenRFID={setWrittenRFID}
                        connection={connection}
                    />
                </div>
            </div>
        </div>
    );
};

export default RFID;

const downloadButtonOnClick = (readRFID: string, writtenRFID: string) => {
    const content = `Okunan RFID Bilgisi: ${readRFID}\nYazılan RFID Bilgisi: ${writtenRFID}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `rfid_log_${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-")}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    toast.success("RFID bilgileri indirildi.");
};
