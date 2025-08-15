"use client";
import { RightCommand } from "@/classes/Command/Commands/RightCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";

import { HubConnection } from "@microsoft/signalr";
import { ArrowRight } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const RightButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={forwardButtonClicked}
            className="bg-amber-300 text-white"
        >
            <ArrowRight className="w-8 h-8 mr-1" />
            Sağ
        </Button>
    );
};

export default RightButton;

const forwardButtonClicked = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new RightCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Sağa komutu gönderildi.");
        else toast.error("Sağa komutu gönderilemedi.");
    } catch (error) {
        console.error("Sağa komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Sağa komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
