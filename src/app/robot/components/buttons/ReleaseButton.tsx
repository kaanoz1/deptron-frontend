"use client";

import { ReleaseCommand } from "@/classes/Command/Commands/RelaseCommand";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { Download } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const ReleaseButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={releaseButtonOnClickEvent}
            className="bg-cyan-300 text-white"
        >
            <Download className="h-5 w-5 " />
            Yük Bırak
        </Button>
    );
};

export default ReleaseButton;

const releaseButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new ReleaseCommand().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Yük bırakma komutu gönderildi.");
        else toast.error("Yük bırakma komutu gönderilemedi.");
    } catch (error) {
        console.error("Yük bırakma komutu gönderilirken hata oluştu:", error);
        toast.error(
            "Yük bırakma komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
