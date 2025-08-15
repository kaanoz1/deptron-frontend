"use client";

import { TakeCommand } from "@/classes/Command/Commands/TakeCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { Upload } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const TakeButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={takeButtonOnClickEvent}
            className="bg-orange-400 text-white"
        >
            <Upload className="h-5 w-5 " />
            Yük Al
        </Button>
    );
};

export default TakeButton;

const takeButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new TakeCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Yük alma komutu gönderildi.");
        else toast.error("Yük alma komutu gönderilemedi.");
    } catch (error) {
        console.error("Yük alma komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Yük alma komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
