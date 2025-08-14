"use client";

import { Button } from "@/components/ui/button";
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

const pauseButtonOnClickEvent = () => {
    toast.success("Puase button clicked");
};
