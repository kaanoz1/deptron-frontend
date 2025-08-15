import { TurnInPlaceLeft } from "@/classes/Command/Commands/TurnInPlaceLeft";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { HubConnection } from "@microsoft/signalr";
import { RotateCcw } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };
const TurnInPlaceLeftButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={turnInPlaceLeftButtonOnClickEvent}
            className="bg-blue-500 text-white"
        >
            <RotateCcw className="w-5 h-5 text-white dark:text-blue-400 dark:hover:text-blue-300 transition-transform duration-200 hover:-rotate-90 drop-shadow-sm" />
            Sola Dön
        </Button>
    );
};

export default TurnInPlaceLeftButton;

const turnInPlaceLeftButtonOnClickEvent = async () => {
    try {
        const response = await axiosInstance.post("/command/add", [
            new TurnInPlaceLeft().toJSON(),
        ]);

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Kendi etrafında sola dönme komutu gönderildi.");
        else toast.error("Kendi etrafında sola dönme komutu gönderilemedi.");
    } catch (error) {
        console.error(
            "Kendi etrafında sola dönme komutu gönderilirken hata oluştu:",
            error,
        );
        toast.error(
            "Kendi etrafında sola dönme komutu gönderilirken hata oluştu. Konsolu kontrol edin.",
        );
    }
};
