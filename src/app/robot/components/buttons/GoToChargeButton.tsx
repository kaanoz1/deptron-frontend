"use client";

import { Button } from "@/components/ui/button";
import { HubConnection } from "@microsoft/signalr";
import { Battery } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const GoToChargeStationButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={goToChargeButtonOnClickEvent}
            className="bg-sky-400 text-black"
        >
            <Battery className="w-8 h-8 mr-1" />
            Şarj
        </Button>
    );
};

export default GoToChargeStationButton;

const goToChargeButtonOnClickEvent = () => {
    toast.success("Şarj button clicked");
};
