"use client";

import { FC, useEffect, useState } from "react";
import { NavbarBrand, Navbar as NavbarWrapper } from "@heroui/react";
import DeptronLogo from "./DeptronLogo";
import { Poppins } from "next/font/google";

const Navbar: FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <NavbarWrapper
            maxWidth="xl"
            isBordered
            isBlurred
            classNames={{
                base: "bg-white dark:bg-black text-foreground border-b border-divider",
            }}
        >
            <NavbarBrand className="items-center gap-2 text-black dark:text-white">
                <DeptronLogo />
                <p
                    className={`font-bold text-inherit px-2 ${poppins.className} `}
                >
                    Deptron Robotics
                </p>
            </NavbarBrand>
        </NavbarWrapper>
    );
};

export default Navbar;

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
