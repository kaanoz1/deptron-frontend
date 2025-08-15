"use client";
import { Command } from "@/classes/Command/Command";
import { BackCommand } from "@/classes/Command/Commands/BackCommand";
import { ForwardCommand } from "@/classes/Command/Commands/ForwardCommand";
import { LeftCommand } from "@/classes/Command/Commands/LeftCommand";
import { RightCommand } from "@/classes/Command/Commands/RightCommand";
import { Button } from "@/components/ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HubConnection } from "@microsoft/signalr";

import { Minus, Plus } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import SendCommands from "./SendCommands";
import { StopCommand } from "@/classes/Command/Commands/StopCommand";
import { ReleaseCommand } from "@/classes/Command/Commands/RelaseCommand";
import { TakeCommand } from "@/classes/Command/Commands/TakeCommand";
import { PauseCommand } from "@/classes/Command/Commands/PauseCommand";
import { ChargeCommand } from "@/classes/Command/Commands/ChargeCommand";
import { TurnInPlaceRight } from "@/classes/Command/Commands/TurnInPlaceRight";
import { TurnInPlaceLeft } from "@/classes/Command/Commands/TurnInPlaceLeft";
import { CurveMinus } from "@/classes/Command/Commands/CurveMinus";
import { CurveStraight } from "@/classes/Command/Commands/CurveStraigth";
import { CurvePlus } from "@/classes/Command/Commands/CurvePlus";

type Props = {
    connection: HubConnection;
    commands: Command[];
    addCommand: (command: Command) => void;
    removeCommandAtIndex: (index: number) => void;
    resetCommands: () => void;
    isMqttWorking: boolean;
};

const Commands: FC<Props> = ({
    commands,
    addCommand,
    removeCommandAtIndex,
    resetCommands,
    isMqttWorking,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedCommand, setSelectedCommand] = useState<Command | null>(
        null,
    );

    return (
        <div className="mt-4">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-md font-semibold">Emirler</h5>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Emir ekle</DialogTitle>
                            <DialogDescription>
                                Robotun yapmasını istediğiniz emirleri buradan
                                ekleyebilirsiniz.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 justify-between items-center">
                            <Select
                                value={selectedCommand?.getCommand() || ""}
                                onValueChange={(key) => {
                                    const selectedCommand = COMMANDS.find(
                                        (command) =>
                                            command.getCommand() === key,
                                    );

                                    if (!selectedCommand) {
                                        toast.error("Geçersiz emir seçildi.");
                                        return;
                                    }

                                    setSelectedCommand(selectedCommand);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Emir seç." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Emirler</SelectLabel>
                                        {COMMANDS.map((command, i) => (
                                            <SelectItem
                                                key={i}
                                                value={command.getCommand()}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {command.getJSXElement()}
                                                    {command.getDescription()}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">İptal et.</Button>
                            </DialogClose>
                            <Button
                                onClick={() => {
                                    if (!selectedCommand) {
                                        toast.error("Lütfen bir emir seçin.");
                                        return;
                                    }

                                    addCommand(selectedCommand);
                                    setIsModalOpen(false);
                                }}
                            >
                                Ekle
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                {commands.map((command, index) => (
                    <div
                        key={index}
                        className="w-full p-2 bg-gray-100 rounded-md mb-2 flex items-center gap-3"
                    >
                        {command.getJSXElement()}
                        <span className="font-medium">
                            {command.getDescription()}
                        </span>
                        <div className="ml-auto flex justify-items items-center gap-2">
                            {command.getState().getJSXElement()}{" "}
                            <Button
                                onClick={() => removeCommandAtIndex(index)}
                                variant="ghost"
                                size="icon"
                                className="hover:bg-red-100 group"
                                aria-label="Komutu sil"
                            >
                                <Minus className="w-5 h-5 text-red-500 group-hover:text-red-700 transition-colors" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-start items-center mt-4">
                <SendCommands
                    commands={commands}
                    isMqttWorking={isMqttWorking}
                    resetSelectedCommands={resetCommands}
                />
            </div>
        </div>
    );
};

export default Commands;

const COMMANDS = [
    new ForwardCommand(),
    new BackCommand(),
    new LeftCommand(),
    new RightCommand(),
    new PauseCommand(),
    new StopCommand(),
    new ReleaseCommand(),
    new TakeCommand(),
    new ChargeCommand(),
    new TurnInPlaceLeft(),
    new TurnInPlaceRight(),
    new CurveMinus(),
    new CurvePlus(),
    new CurveStraight(),
];
