import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from "@/classes/User/user";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import {
    CONFLICT_HTTP_RESPONSE_ERROR_CODE,
    FORBIDDEN_HTTP_RESPONSE_ERROR_CODE,
    OK_HTTP_RESPONSE_CODE,
    UNAUTHORIZED_HTTP_RESPONSE_ERROR_CODE,
} from "@/types/constants";
import axios from "axios";
import { Plus } from "lucide-react";

type Props = {
    refetch: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<User[], Error>>;
};

const CreateUser: FC<Props> = ({ refetch }) => {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TCreateNewUser>();

    const onSubmit = handleSubmit(async (formData) => {
        await createUser(
            formData,
            refetch,
            () => reset(),
            () => setOpen(false),
        );
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kullanıcı
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            {...register("username", {
                                required: "Username is required.",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Username must be at least 5 characters long.",
                                },
                                maxLength: {
                                    value: 16,
                                    message:
                                        "Username cannot exceed 16 characters.",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._]+$/,
                                    message:
                                        "Username can only contain English letters, digits, dots (.) and underscores (_).",
                                },
                            })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required.",
                                maxLength: {
                                    value: 255,
                                    message:
                                        "Email cannot exceed 255 characters.",
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address format.",
                                },
                                validate: (value) =>
                                    /^[\x00-\x7F]+$/.test(value) ||
                                    "Email must contain only English characters.",
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register("name", {
                                required: "Name is required.",
                                maxLength: {
                                    value: 16,
                                    message:
                                        "Name cannot exceed 16 characters.",
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message:
                                        "Name must contain only letters (A-Z).",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="surname">Surname</Label>
                        <Input
                            id="surname"
                            {...register("surname", {
                                maxLength: {
                                    value: 16,
                                    message:
                                        "Surname cannot exceed 16 characters.",
                                },
                                pattern: {
                                    value: /^[A-Za-z]*$/,
                                    message:
                                        "Surname must contain only letters (A-Z) if provided.",
                                },
                            })}
                        />
                        {errors.surname && (
                            <p className="text-red-500 text-sm">
                                {errors.surname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Default Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("defaultPassword", {
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters long.",
                                },
                                maxLength: {
                                    value: 256,
                                    message:
                                        "Password cannot exceed 256 characters.",
                                },
                            })}
                        />
                        {errors.defaultPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.defaultPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="roles">Roles</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue("roles", [value])
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Rol seçin (isteğe bağlı)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit">Oluştur</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUser;

type TCreateNewUser = {
    name: string;
    surname: string;
    email: string;
    roles: string[];
    username: string;
    defaultPassword: string;
};

const createUser = async (
    data: TCreateNewUser,
    refetch: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<User[], Error>>,
    reset: () => void,
    setDialogClose: () => void,
) => {
    try {
        const response = await axiosInstance.post<string>(
            "admin/user/add",
            data,
        );

        const status = response.status;

        if (status == OK_HTTP_RESPONSE_CODE) {
            await refetch();
            reset();
            setDialogClose();
            toast.success("Oluşturuldu!", {
                description: `${data.username} başarı ile oluşturuldu.`,
            });
        }
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError<string>(error)) {
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
};
