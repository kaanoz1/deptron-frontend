import { Button } from "@/components/ui/button";
import DeptronLogo from "@/components/UI/DeptronLogo";
import { HubConnection } from "@microsoft/signalr";
import { FC } from "react";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const DeptronEmptyLogo: FC<Props> = ({ isMqttWorking }) => {
    return (
        <Button disabled={!isMqttWorking} className="bg-green-500 text-white">
            <DeptronLogo className="h-8" />
        </Button>
    );
};

export default DeptronEmptyLogo;
