"use client";

import { FC } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import {
    BAD_REQUEST_HHTP_RESPONSE_ERROR_CODE,
    CONFLICT_HTTP_RESPONSE_ERROR_CODE,
    FORBIDDEN_HTTP_RESPONSE_ERROR_CODE,
    OK_HTTP_RESPONSE_CODE,
    UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE,
} from "@/types/constants";
import axios from "axios";

type TPasswordChangeForm = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const PasswordChangeNavbarDialog: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TPasswordChangeForm>();

    const onSubmit = handleSubmit(async (data: TPasswordChangeForm) => {
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error("New password confirmation does not match.");
            return;
        }

        try {
            const response = await axiosInstance.put(
                "/session/change-password",
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                },
            );

            const status = response.status;

            if (status === OK_HTTP_RESPONSE_CODE) {
                toast.success("Şifre değiştirildi.");
                reset();
                return;
            }

            throw new Error(`Unexpected status: ${status}`);
        } catch (error: unknown) {
            console.error(error);

            if (axios.isAxiosError<string>(error)) {
                if (
                    error.response?.status ===
                    UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE
                ) {
                    toast.error("Giriş yapın", {
                        description: "Giriş yapmadınız. Token geçersiz.",
                    });
                    return;
                }

                if (
                    error.response?.status ===
                    BAD_REQUEST_HHTP_RESPONSE_ERROR_CODE
                ) {
                    toast.error("Başarısız", {
                        description: `${error.response.data}`,
                    });
                    return;
                }

                if (
                    error.response?.status ===
                    FORBIDDEN_HTTP_RESPONSE_ERROR_CODE
                ) {
                    toast.error("Yetkiniz yok.", {
                        description:
                            "Bu işlemi yapmak için gerekli yetkiniz yok.",
                    });
                    return;
                }

                if (
                    error.response?.status === CONFLICT_HTTP_RESPONSE_ERROR_CODE
                ) {
                    if (error.response.data.includes("email")) {
                        toast.error(
                            "Aynı email'e sahip bir kullanıcı zaten var..",
                            { description: "Tabloyu yenileyin" },
                        );
                        return;
                    }

                    if (error.response.data.includes("username")) {
                        toast.error(
                            "Aynı kullanıcı adına sahip bir kullanıcı zaten var..",
                            { description: "Tabloyu yenileyin" },
                        );
                        return;
                    }
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
                        error.response?.data ?? "Bilinmeyen bir hata oluştu.",
                });
                return;
            }

            toast.error("Bilinmeyen Hata", {
                description:
                    "Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.",
            });
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Şifreyi değiştir
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Şifreni değiştir</DialogTitle>
                    </DialogHeader>

                    <div>
                        <Label htmlFor="currentPassword">Eski Şifre</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            {...register("currentPassword", {
                                required: "Current password is required.",
                            })}
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            {...register("newPassword", {
                                required: "New password is required.",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters long.",
                                },
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="confirmNewPassword">
                            Yeni Şifre (Tekrar)
                        </Label>
                        <Input
                            id="confirmNewPassword"
                            type="password"
                            {...register("confirmNewPassword", {
                                required: "You must confirm your new password.",
                            })}
                        />
                        {errors.confirmNewPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmNewPassword.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Vazgeç
                            </Button>
                        </DialogClose>
                        <Button type="submit">Şifreyi Değiştir</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordChangeNavbarDialog;
