"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { Code2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HubConnection } from "@microsoft/signalr";
import { Command } from "@/classes/Command/Command";

type Props = { connection: HubConnection };

const CommandsHistory: FC<Props> = () => {
    const [commands] = useState<Command[]>([]);
    const [_, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     const handler = (obj: TCommandConstructorParametersJSON) =>
    //         newCommandHandler(obj, commands, setCommands);

    //     connection.on("net/commands", handler);

    //     return () => {
    //         connection.off("net/commands", handler);
    //     };
    // }, [connection, commands]);

    return (
        <div className="text-sm">
            <div className="flex items-center gap-1 font-semibold mb-1">
                <Code2 className="w-5 h-5" />
                <p className="text-base">Son emirler</p>
                <Button
                    className="ml-auto"
                    // onClick={() => onDownloadClickButton(commands)}
                >
                    <Download className="w-5 h-5" />
                </Button>
            </div>

            {commands.length === 0 ? (
                <div className="text-muted-foreground text-sm p-4 border border-dashed border-gray-300 rounded-lg bg-muted/50 text-center">
                    Hiçbir komut bulunamadı.
                </div>
            ) : (
                <ul className="flex flex-col gap-1 text-sm font-mono">
                    {commands.map((cmd, index) => (
                        <li
                            key={index}
                            className="whitespace-pre-wrap leading-snug"
                        >
                            <span className="text-muted-foreground">
                                {/* [{cmd.getDateString()}] */}
                            </span>{" "}
                            {cmd.getDescription()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommandsHistory;

// const onDownloadClickButton = (commands: Command[]) => {
//     if (commands.length === 0) {
//         toast.info("İndirilecek komut bulunamadı.");
//         return;
//     }

//     const content = commands
//         .map(
//             (cmd) =>
//                 `[${cmd
//                     .getDate()
//                     .toLocaleString("tr-TR")}] ${cmd.getDescription()}`,
//         )
//         .join("\n");

//     const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "commands_log.txt";
//     link.click();

//     URL.revokeObjectURL(url);

//     toast.success("Komut geçmişi indirildi.");
// };

// const newCommandHandler = (
//     obj: TCommandConstructorParametersJSON,
//     commands: Command[],
//     setCommands: (data: Command[]) => void,
// ) => {
//     const command = Command.createFromJSON(obj);
//     setCommands([command, ...commands]);
// };
