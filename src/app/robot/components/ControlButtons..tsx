"use client";

import { FC } from "react";
import { HubConnection } from "@microsoft/signalr";
import StartButton from "@/app/robot/components/buttons/StartButton";
import PauseButton from "@/app/robot/components/buttons/PauseButton";
import ResetButton from "@/app/robot/components/buttons/ResetButton";
import StopButton from "@/app/robot/components/buttons/StopButton";
import MqttStartButton from "./buttons/MqttStartButton";
import MqttStopButton from "./buttons/MqttStop";
import TurnInPlaceRightButton from "./buttons/TurnInPlaceRightButton";
import TurnInPlaceLeftButton from "./buttons/TurnInPlaceLeftButton";
import ForwardButton from "./buttons/ForwardButton";
import LeftButton from "./buttons/LeftButton";
import RightButton from "./buttons/RightButton";
import BackwardButton from "./buttons/BackwardButton";
import ReleaseButton from "./buttons/ReleaseButton";
import TakeButton from "./buttons/TakeButton";

type Props = { isMqttWorking: boolean; connection: HubConnection };

const ControlButtons: FC<Props> = ({ isMqttWorking, connection }) => {
    return (
        <div className="grid grid-cols-3 gap-6 w-full">
            <MqttStartButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <MqttStopButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />

            <StartButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <PauseButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <ResetButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <StopButton isMqttWorking={isMqttWorking} connection={connection} />

            <TurnInPlaceLeftButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <ForwardButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />

            <TurnInPlaceRightButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <LeftButton isMqttWorking={isMqttWorking} connection={connection} />
            <div></div>

            <RightButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />

            <ReleaseButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />

            <BackwardButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            />
            <TakeButton isMqttWorking={isMqttWorking} connection={connection} />
            {/* <GoToChargeButton
                isMqttWorking={isMqttWorking}
                connection={connection}
            /> */}
        </div>
    );
};

export default ControlButtons;
