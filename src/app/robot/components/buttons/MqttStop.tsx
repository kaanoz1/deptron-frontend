"use client";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { WifiOff } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const MqttStopButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={mqttStop}
            className="bg-purple-400 text-white"
        >
            <WifiOff className="w-8 h-8 mr-1" />
            {"Mqtt'yi durdur"}
        </Button>
    );
};

export default MqttStopButton;

const mqttStop = async () => {
    try {
        const { status } = await axiosInstance.post("/mqtt/stop");
        if (status !== OK_HTTP_RESPONSE_CODE)
            throw new Error("MQTT durdurulurken bir şeyler ters gitti.");
    } catch (error) {
        console.error(error);
        toast.error("Hata!", { description: "Konsolu kontrol edin." });
    }
};
