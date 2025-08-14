/*
"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import { Response } from "@/types/response";
import { Loader2Icon } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance.ts";
import axios from "axios";
import { toast } from "sonner";
import { UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE } from "@/types/constants.ts";
import { Montserrat } from "next/font/google";

type LoginFormData = { email: string; password: string };

const Page: NextPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>();

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await axiosInstance.post<Response<string>>(
                "/auth/login",
                data,
            );
            return response.data;
        },
        onSuccess: async (data) => {
            axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${data.data}`;
            await fetchUser();
            toast.success("Giriş başarılı!");
            router.push("/");
        },
        onError: (error: unknown) => {
            console.error(error);

            if (axios.isAxiosError(error)) {
                if (
                    error.response?.status ===
                    UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE
                ) {
                    setError("password", {
                        type: "value",
                        message: "Email ya da şifre hatalı.",
                    });
                    toast.error("Giriş başarısız", {
                        description:
                            "Email ya da şifre hatalı. Lütfen tekrar deneyin.",
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
        },
    });

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4">
            <div className="w-full max-w-md p-8 bg-white border rounded-lg shadow-md">
                <h1
                    className={`text-3xl mb-6 font-semibold text-center ${montserrat.className}`}
                >
                    Giriş Yap
                </h1>

                <form
                    onSubmit={handleSubmit((values) =>
                        loginMutation.mutate(values),
                    )}
                    className="space-y-5"
                >
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email zorunludur.",
                                validate: (value) =>
                                    /\S+@\S+\.\S+/.test(value) ||
                                    "Geçerli bir email girin.",
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "Şifre zorunludur.",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Şifre en az 6 karakter olmalıdır.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            "Giriş Yap"
                        )}
                    </Button>

                    <p className="text-sm italic text-center text-muted-foreground mt-4">
                        Sadece Deptron üyeleri giriş yapabilir.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Page;

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-montserrat",
    display: "swap",
});

*/
