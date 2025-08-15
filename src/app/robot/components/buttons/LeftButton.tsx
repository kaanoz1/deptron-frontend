"use client";
import { LeftCommand } from "@/classes/Command/Commands/LeftCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";

import { HubConnection } from "@microsoft/signalr";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const LeftButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={forwardButtonClicked}
            className="bg-amber-300 text-white"
        >
            <ArrowLeft className="w-8 h-8 mr-1" />
            Sol
        </Button>
    );
};

export default LeftButton;

const forwardButtonClicked = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new LeftCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Sol komutu gönderildi.");
        else toast.error("Sol komutu gönderilemedi.");
    } catch (error) {
        console.error("Sol komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Sol komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
