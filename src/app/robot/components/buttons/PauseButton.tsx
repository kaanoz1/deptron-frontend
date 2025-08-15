"use client";

import { PauseCommand } from "@/classes/Command/Commands/PauseCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { Pause } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const PauseButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={pauseButtonOnClickEvent}
            className="bg-yellow-400 text-black"
        >
            <Pause className="w-8 h-8 mr-1" />
            Duraklat
        </Button>
    );
};

export default PauseButton;

const pauseButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new PauseCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Duraklatma komutu gönderildi.");
        else toast.error("Duraklatma komutu gönderilemedi.");
    } catch (error) {
        console.error("Duraklatma komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Duraklatma komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
