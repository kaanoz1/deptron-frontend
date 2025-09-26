"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMail, LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

const Footer: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <footer className="dark:bg-black dark:border-gray-700 w-full px-5 py-4 border-t shadow-sm bg-white ">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mx-auto max-w-7xl py-0">
        <div>
          <Button
            isIconOnly
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4">
          <Link
            href="mailto:deptronrobotics@gmail.com"
            className="w-8 h-8 flex items-center justify-center hover:opacity-90 transition-all"
          >
            <LuMail className="w-full h-full text-black dark:text-white" />
          </Link>
          {/* 
          <Link href="https://www.ce.yildiz.edu.tr/" className="w-8 h-8">
            <Image
              src="/ytu_logo.svg"
              alt="YTU Logo"
              width={40}
              height={40}
              className="object-contain dark:invert"
            />
          </Link> */}

          <Link
            href="https://www.linkedin.com/company/deptron"
            className="w-8 h-8"
          >
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
              width={40}
              height={40}
              className="dark:invert-0"
            />
          </Link>

          <Link
            href="https://www.instagram.com/deptron_robotics/"
            className="w-8 h-8"
          >
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </Link>

          <Link href="https://github.com/deptronrobotics" className="w-8 h-8">
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              width={40}
              height={40}
              className="dark:invert"
            />
          </Link>

          <Link href="https://x.com/DeptronRobotics" className="w-8 h-8">
            <Image
              src="/x.svg"
              alt="X"
              width={40}
              height={40}
              className="dark:invert"
            />
          </Link>

          {/* <Link href="https://www.instagram.com/ytumint/" className="w-8 h-8">
            <Image
              src="/ytu_mint.jpg"
              alt="YTU Mint"
              className="object-cover rounded-md"
              width={40}
              height={40}
            />
          </Link> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
