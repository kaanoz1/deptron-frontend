"use client";
import { FC, ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

type Props = { children: ReactNode };

const Providers: FC<Props> = ({ children }) => {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    );
};

export default Providers;
