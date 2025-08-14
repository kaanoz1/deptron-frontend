import { User } from "@/classes/User/user";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axiosInstance";
import {
    CONFLICT_HTTP_RESPONSE_ERROR_CODE,
    FORBIDDEN_HTTP_RESPONSE_ERROR_CODE,
    OK_HTTP_RESPONSE_CODE,
    PRECONDITON_FAILED_HTTP_RESPONSE_ERROR_CODE,
    UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE,
} from "@/types/constants";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteUserComponent({
    user,
    refetch,
}: {
    user: User;
    refetch: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<User[], Error>>;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Trash2 /> Kullanıcı sil
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Kullanıcıyı sil?</DialogTitle>
                    <DialogDescription>
                        Bu kullanıcıyı silmek istediğinize emin misiniz?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        variant={"destructive"}
                        onClick={() => deleteUser(user, refetch)}
                    >
                        <Trash2 /> Kullanıcı sil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const deleteUser = async (
    user: User,
    refetch: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<User[], Error>>,
) => {
    try {
        const userId = user.getId();

        const response = await axiosInstance.delete<string>(
            "admin/user/delete",
            { data: { userId } },
        );

        const status = response.status;

        if (status == OK_HTTP_RESPONSE_CODE) {
            await refetch();
            toast.success("Silindi.");
            return;
        }

        throw new Error(`Unexpected status: ${status}`);
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
            if (
                error.response?.status === UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE
            ) {
                toast.error("Giriş yapın", {
                    description: "Giriş yapmadınız. Token geçersiz.",
                });
                return;
            }

            if (error.response?.status === FORBIDDEN_HTTP_RESPONSE_ERROR_CODE) {
                toast.error("Yetkiniz yok.", {
                    description: "Bu işlemi yapmak için gerekli yetkiniz yok.",
                });
                return;
            }

            if (error.response?.status === CONFLICT_HTTP_RESPONSE_ERROR_CODE) {
                toast.error("Kendinizi silemezsiniz.", {
                    description: "Veri tabanı üzerinden işlem yapın.",
                });
                return;
            }

            if (
                error.response?.status ===
                PRECONDITON_FAILED_HTTP_RESPONSE_ERROR_CODE
            ) {
                toast.error("Admin'ler silinemez.", {
                    description: "Veri tabanı üzerinden işlem yapın.",
                });
                return;
            }

            if (
                error.code === "ERR_NETWORK" ||
                error.code === "ERR_BAD_REQUEST"
            ) {
                toast.error("Ağ Hatası", {
                    description:
                        "Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.",
                });
                return;
            }

            toast.error("Hata", {
                description:
                    error.response?.data?.message ??
                    "Bilinmeyen bir hata oluştu.",
            });
            return;
        }

        toast.error("Bilinmeyen Hata", {
            description:
                "Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.",
        });
    }
};
