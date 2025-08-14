"use client";

import { Button } from "@/components/ui/button";
import { HubConnection } from "@microsoft/signalr";
import { RefreshCcw } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = { connection: HubConnection; isMqttWorking: boolean };

const ResetButton: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button
            disabled={!isMqttWorking}
            onClick={resetButtonOnClickEvent}
            className="bg-neutral-600 text-white"
        >
            <RefreshCcw className="w-8 h-8 mr-1" />
            Reset
        </Button>
    );
};

export default ResetButton;

const resetButtonOnClickEvent = () => {
    toast.success("Reset button clicked");
};
