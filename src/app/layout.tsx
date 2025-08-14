import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/UI/Navbar.tsx";
import Footer from "@/components/UI/Footer";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = { title: "Deptron", description: "Robotics" };

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Toaster richColors closeButton />
                <ReactQueryProvider>
                    {/* <UserContextProvider> */}
                    <Navbar />
                    {children}
                    <Footer />
                    {/* </UserContextProvider> */}

                    <ReactQueryDevtools />
                </ReactQueryProvider>
            </body>
        </html>
    );
}
