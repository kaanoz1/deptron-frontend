"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FilePen, Mail } from "lucide-react";

import ytuMint from "@/assets/images/ytu_mint.jpg";
import { Montserrat } from "next/font/google";

const Footer: FC = () => {
    return (
        <footer className="w-full px-5 py-4 h-[75px] border-t shadow-sm bg-white">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
                <Link
                    href="https://forms.gle/5326r8QiA5tqPfBB8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-90 transition-all"
                >
                    <div className="w-7 h-7 flex items-center justify-center">
                        <FilePen className="w-full h-full text-black" />
                    </div>
                    <span
                        className={`text-base font-medium ${montserrat.className}`}
                    >
                        Bize katılmak ister misiniz?
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href="mailto:deptronrobotics@gmail.com"
                        className="w-8 h-8 flex items-center justify-center  hover:opacity-90 transition-all"
                    >
                        <Mail className="w-full h-full text-black" />
                    </Link>

                    <Link
                        href="https://www.ce.yildiz.edu.tr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src="/svgs/ytu_logo.svg"
                            alt="YTU Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </Link>

                    <Link
                        href="https://www.linkedin.com/company/deptron"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                            alt="LinkedIn"
                            width={40}
                            height={40}
                        />
                    </Link>

                    <Link
                        href="https://www.instagram.com/deptron_robotics/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src="/svgs/instagram.svg"
                            alt="Instagram"
                            width={40}
                            height={40}
                        />
                    </Link>

                    <Link
                        href="https://github.com/deptronrobotics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            alt="GitHub"
                            width={40}
                            height={40}
                        />
                    </Link>

                    <Link
                        href="https://x.com/DeptronRobotics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src="/svgs/x.svg"
                            alt="X"
                            width={40}
                            height={40}
                        />
                    </Link>

                    <Link
                        href="https://www.instagram.com/ytumint/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8"
                    >
                        <Image
                            src={ytuMint}
                            alt="YTU Mint"
                            className="object-cover rounded-md"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-montserrat",
    display: "swap",
});
