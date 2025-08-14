/*
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2Icon } from "lucide-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Users from "./components/Users";

const Page: NextPage = () => {
    const router = useRouter();

    if (isUserLoading)
        return <Loader2Icon className="animate-spin h-[calc(100vh-160px)]" />;

    if (user === null || !user.getRoles().includes("admin")) {
        router.push("/");
        return <></>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-3 min-h-[calc(100vh-160px)]">
            <div className="max-w-6xl min-w-4xl flex flex-col justify-center items-center gap-2">
                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="users">Takım Üyeleri</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                        <Users />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Page;
*/
