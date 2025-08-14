"use client";
import { ForwardCommand } from "@/classes/Command/Commands/ForwardCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";

import { HubConnection } from "@microsoft/signalr";
import { Play } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const StartButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={startButtonOnClickEvent}
            className="bg-green-500 text-white"
        >
            <Play className="w-8 h-8 mr-1" />
            Başla
        </Button>
    );
};

export default StartButton;

const startButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new ForwardCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Başlatma komutu gönderildi.");
        else toast.error("Başlatma komutu gönderilemedi.");
    } catch (error) {
        console.error("Başlatma komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Başlatma komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
