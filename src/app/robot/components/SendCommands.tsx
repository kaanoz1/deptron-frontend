import { Command } from "@/classes/Command/Command";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { Send } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

type Props = {
    commands: Command[];
    resetSelectedCommands: () => void;
    isMqttWorking: boolean;
};

const SendCommandsButton: FC<Props> = ({
    commands,
    resetSelectedCommands,
    isMqttWorking,
}) => {
    return (
        <Button
            disabled={!isMqttWorking || commands.length === 0}
            onClick={() => {
                sendCommands(commands);
                resetSelectedCommands();
            }}
        >
            <Send />
            <span className="ml-2">Emirleri gönder</span>
        </Button>
    );
};

export default SendCommandsButton;

const sendCommands = async (commands: Command[]) => {
    try {
        const response = await axiosInstance.post(
            "/command/add",
            commands.map((command) => command.toJSON()),
        );

        if (response.status === OK_HTTP_RESPONSE_CODE)
            toast.success("Emirler başarıyla gönderildi.");
        else
            toast.error("Emirler gönderilemedi.", {
                description: "Lütfen internet bağlantınızı kontrol edin.",
            });
    } catch (error) {
        console.error(error);
        toast.error("Emirler gönderilemedi.", {
            description: "Beklenmeyen bir hata oluştu. Konsolu kontrol edin.",
        });

        return;
    }
};
