"use client";

import { StopCommand } from "@/classes/Command/Commands/StopCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { StopCircle } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const StopButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={stopButtonOnClickEvent}
            className="bg-red-600 text-white"
        >
            <StopCircle className="w-8 h-8 mr-1" />
            Durdur
        </Button>
    );
};
export default StopButton;

const stopButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new StopCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Durdurma komutu gönderildi.");
        else toast.error("Durdurma komutu gönderilemedi.");
    } catch (error) {
        console.error("Durdurma komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Durdurma komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
