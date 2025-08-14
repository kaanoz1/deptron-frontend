"use client";
import { User, UserDTO } from "@/classes/User/user";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/types/constants";
import { Response } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon, MoreVertical, RefreshCcw } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "./DataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteUserComponent } from "./DeleteUser";
import CreateUser from "./CreateUser";

const Users: FC = () => {
    const {
        data = [],
        isLoading,
        refetch,
    } = useQuery<Array<User>>({
        queryKey: ["admin", "users"],
        queryFn: fetchUsers,
    });

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "image",
            header: "Avatar",
            cell: ({ row }) => {
                const user: User = row.original;
                return (
                    <Avatar>
                        <AvatarImage src={user.getImageUrl()} />
                        <AvatarFallback>
                            {user.getFallbackName()}
                        </AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => row.original.getEmail(),
        },
        {
            accessorKey: "username",
            header: "Kullanıcı Adı",
            cell: ({ row }) => row.original.getUsername(),
        },
        {
            accessorKey: "name",
            header: "Ad",
            cell: ({ row }) => row.original.getName(),
        },

        {
            accessorKey: "surname",
            header: "Soyadı ",
            cell: ({ row }) => row.original.getSurname(),
        },
        {
            accessorKey: "more",
            header: "İşlemler",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild color="red">
                                <DeleteUserComponent
                                    user={row.original}
                                    refetch={refetch}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (isLoading)
        return <Loader2Icon className="animate-spin h-[calc(100vh-160px)]" />;

    return (
        <div className="flex flex-col gap-4 items-center w-full px-6 ">
            <div className="flex justify-end w-full">
                <CreateUser refetch={refetch} />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                        await refetch();
                        toast.success("Yenilendi.");
                    }}
                >
                    <RefreshCcw className="w-8 h-8 mr-2" />
                    Yenile
                </Button>
            </div>

            <div className="w-full max-w-5xl rounded-md border">
                <DataTable<User, unknown> columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Users;

const fetchUsers = async (): Promise<Array<User>> => {
    try {
        const response =
            await axiosInstance.get<Response<Array<UserDTO>>>(
                "/admin/user/all",
            );

        const status = response.status;

        if (status === OK_HTTP_RESPONSE_CODE)
            return response.data.data.map(User.createFromJSON);

        throw new Error(`Unexpected status. Status code: ${status}`);
    } catch (error: unknown) {
        console.error(error);

        if (axios.isAxiosError(error)) {
            if (
                error.code === "ERR_NETWORK" ||
                error.code === "ERR_BAD_REQUEST"
            ) {
                toast.error("Ağ Hatası", {
                    description:
                        "Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.",
                });
                return [];
            }

            toast.error("Hata", {
                description:
                    error.response?.data?.message ??
                    "Bilinmeyen bir hata oluştu.",
            });
            return [];
        }

        toast.error("Bilinmeyen Hata", {
            description:
                "Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.",
        });

        return [];
    }
};
