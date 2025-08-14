"use client";
import { createContext, ReactNode } from "react";
import {
    useQuery,
    UseQueryResult,
    useQueryClient,
    QueryObserverResult,
    RefetchOptions,
} from "@tanstack/react-query";
import { Response } from "@/types/response";
import axiosInstance from "@/lib/axiosInstance.ts";
import { UserMe, UserMeDTO } from "@/classes/User/user.ts";

type UserContextType = {
    user: UserMe | null;
    userError: Error | null;
    setUser: (user: UserMe | null) => void;
    fetchUser: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<UserMe>>;
    isUserLoading: boolean;
    isFetched: boolean;
    logOut: () => void;
};
export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    const setUser = (updatedUser: UserMe | null) => {
        queryClient.setQueryData(["user"], () =>
            updatedUser ? UserMe.getClone(updatedUser) : null,
        );
    };

    const {
        data: user,
        error,
        isLoading,
        refetch,
        isFetched,
    }: UseQueryResult<UserMe> = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            axiosInstance
                .get<Response<UserMeDTO>>("/session/me")
                .then((res) => UserMe.createFromJSON(res.data.data)),
        refetchInterval: 1000 * 60 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return (
        <UserContext.Provider
            value={{
                user: user ?? null,
                setUser,
                userError: error as Error | null,
                fetchUser: refetch,
                isUserLoading: isLoading,
                isFetched,
                logOut: () => setUser(null),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
