"use client";
import { BackCommand } from "@/classes/Command/Commands/BackCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";

import { HubConnection } from "@microsoft/signalr";
import { ArrowDown } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const BackwardButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={forwardButtonClicked}
            className="bg-green-500 text-white"
        >
            <ArrowDown className="w-8 h-8 mr-1" />
            Geri
        </Button>
    );
};

export default BackwardButton;

const forwardButtonClicked = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new BackCommand().toJSON(),
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
