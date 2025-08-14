"use client";

import { FC } from "react";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const HomePage: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] px-4">
            <Terminal className="w-10 h-10 text-black mb-4" />

            <h1
                className={`text-2xl sm:text-3xl font-semibold mb-4 ${montserrat.className}`}
            >
                No Just Robotics. It’s Deptron.
            </h1>

            <p className="max-w-xl text-gray-700 text-sm sm:text-base mb-4 text-center">
                Deptron, Yıldız Teknik Üniversitesi <strong>YTU Mint</strong>{" "}
                kulübü üyeleri tarafından kurulmuş bir mühendislik takımıdır.
                2025 yılı <strong>Sanayide Dijital Teknolojiler</strong>{" "}
                yarışması (TEKNOFEST) için geliştirilmiş bir projeyi temsil
                etmektedir.
            </p>

            <Link
                href="https://www.teknofest.org/tr/yarismalar/sanayide-dijital-teknolojiler-yarismasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:opacity-80 transition-all text-sm sm:text-base"
            >
                Yarışma detayları için tıklayın
            </Link>
        </div>
    );
};

export default HomePage;

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-montserrat",
    display: "swap",
});
