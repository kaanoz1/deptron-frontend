"use client";

import { FC } from "react";
import DeptronLogo from "@/components/UI/DeptronLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot, Info, Users } from "lucide-react";
import { Montserrat } from "next/font/google";

const Navbar: FC = () => {
    return (
        <nav className="w-full px-5 py-3 border h-[85px] shadow-sm">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <DeptronLogo />
                        <span
                            className={`text-lg font-semibold ${montserrat.className}`}
                        >
                            DEPTRON
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild className="gap-2">
                        <Link href="/about">
                            <Info className="w-8 h-8 text-black" />
                            <span className={montserrat.className}>
                                Biz Kimiz?
                            </span>
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="gap-2">
                        <Link href="/">
                            <Users className="w-8 h-8 text-black" />
                            <span className={montserrat.className}>
                                Takım üyeleri
                            </span>
                        </Link>
                    </Button>

                    <Button
                        key="robot"
                        variant="outline"
                        asChild
                        className="gap-2"
                    >
                        <Link href="/robot">
                            <Bot className="w-8 h-8 text-black" />
                            <span className={montserrat.className}>Robot</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-montserrat",
    display: "swap",
});
