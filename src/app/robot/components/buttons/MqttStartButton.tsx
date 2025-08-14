"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { Wifi } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const MqttStartButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            onClick={mqttStart}
            disabled={isMqttWorking}
            className="bg-indigo-500 text-white"
        >
            <Wifi className="w-8 h-8 mr-1" />
            {"Mqtt'yi başlat"}
        </Button>
    );
};

export default MqttStartButton;

const mqttStart = async () => {
    try {
        const { status } = await axiosInstance.post("/mqtt/start");
        if (status !== OK_HTTP_RESPONSE_CODE)
            throw new Error("MQTT çalıştırılırken bir şeyler ters gitti.");

        toast.success("Başarılı", { description: "MQTT'ye bağlanıldı!" });
    } catch (error) {
        console.error(error);
        toast.error("Hata!", { description: "Konsolu kontrol edin." });
    }
};
